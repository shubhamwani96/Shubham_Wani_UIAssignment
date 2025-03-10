import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";
import "../../../src/global.css";
import "../../../src/composites/rewardPoints/rewardStyles.css";
import { Button } from "../../components/button/Button";
import { calculateRewardPoints } from "../../utility/CalculateRewardPoints";

export const RewardPoints = (prop) => {
  const [rewards, setRewards] = useState([]);
  const [rewardCustomerData, setRewardCustomerData] = useState([]);

  useEffect(() => {
    if ( prop.rewardData?.length > 0) {
      setRewardCustomerData(prop.rewardData);
    } else {
      setRewardCustomerData([]);
    }
  }, [prop.rewardData]);

  /**
   * Calculate Monthly and Total Reward Points
   */

  const calculateMonthlyRewardPoints = () => {
    const rewardSummary = rewardCustomerData.map((customer) => {
      let monthlyRewards = {};
      let totalRewards = 0;

      customer.transactions.forEach(({ month, amount }) => {
        const points = calculateRewardPoints(amount);
        monthlyRewards[month] = (monthlyRewards[month] || 0) + points;
        totalRewards += points;
      });

      return {
        customerId: customer.customerId,
        name: customer.name,
        monthlyRewards,
        totalRewards,
      };
    });

    setRewards(rewardSummary);
  };

  return (
    <div className={"Wrapper"}>
      <Table
        tablename={"Customer Reward Program"}
        rewards={rewards}
        schema={[
          { index: 0, label: "Customer ID" },
          { index: 1, label: "Name" },
          { index: 2, label: "January" },
          { index: 3, label: "February" },
          { index: 4, label: "March" },
          { index: 5, label: "Total Reward Points" },
        ]}
      />
      <div className={"Reward"}>
        <Button onClick={calculateMonthlyRewardPoints}>
          {"Calculate Rewards"}
        </Button>
        <Button onClick={() => setRewards([])}>{"Close"}</Button>
      </div>
    </div>
  );
};
