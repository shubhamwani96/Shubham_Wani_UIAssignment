import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";
import "../../../src/global.css";
import { Button } from "../../components/button/Buttonc";

export const RewardsPoints = () => {
  const [rewards, setRewards] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    /**
     *Fetch data from the local JSON file
     */

    fetch("http://localhost:3000/CustomerData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        /**
         *Update state with the fetched data
         */
        setCustomerData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  /**
   *Empty dependency array ensures this effect runs only once after the initial render
   */

  /**
   * Function to calculate reward points for each transaction
   */

  const calculateRewardPoints = (amount) => {
    const purchaseAmount = parseFloat(amount);

    let points = 0;
    if (purchaseAmount > 100) {
      /**
       *  2 points for each dollar over $100
       */
      points += (purchaseAmount - 100) * 2;
      /**
       *  50 points for the $50 between $50 and $100
       */

      points += 50;
    } else if (purchaseAmount > 50) {
      /**
       *  1 point for each dollar over $50
       */
      points += purchaseAmount - 50;
    }

    return points;
  };

  /**
   * Calculate Monthly and Total Reward Points
   */

  const calculateMonthlyRewardPoints = () => {
    const rewardSummary = customerData.map((customer) => {
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
        tablename={"Customer Rewards Program"}
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

      <Button onClick={calculateMonthlyRewardPoints}>
        {"Calculate Rewards"}
      </Button>
    </div>
  );
};
