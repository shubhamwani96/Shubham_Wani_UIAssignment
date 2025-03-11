import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";
import "../../../src/global.css";
import "../../../src/composites/rewardPoints/rewardStyles.css";
import { Button } from "../../components/button/Button";
import { Textbox } from "../../components/textbox/Textbox";
import { calculateMonthlyRewardPoints } from "../../utility/CalculateMonthlyRewardPoints";
import { useDebounce } from "../../utility/Debounce";
import { Loader } from "../../components/loader/Loader";

/**
 *RewardPoints Composite to show Monthly and Total Reward Points
 *@param prop rewardData as a props"
 *@returns table to show Monthly and Total Reward Data data
 */

export const RewardPoints = (prop) => {
  const [rewards, setRewards] = useState([]);
  const [rewardCustomerData, setRewardCustomerData] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(rewards);

  const debouncedQuery = useDebounce(query, 500); // Get the debounced query value

  useEffect(() => {
    if (debouncedQuery) {
      // Filter customers based on the debounced query
      const results = rewards.filter((customer) =>
        customer.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredCustomers(results);
    } else {
      setFilteredCustomers(rewards);
    }
  }, [debouncedQuery, rewards]);

  useEffect(() => {
    if (prop.rewardData?.length > 0) {
      setRewardCustomerData(prop.rewardData);
    } else {
      setRewardCustomerData([]);
    }
  }, [prop.rewardData]);

  const handleCalculateRewards = () => {
    const summary = calculateMonthlyRewardPoints(rewardCustomerData);
    setRewards(summary);
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className={"Wrapper"}>
      <h2>{"Customer Reward Program"}</h2>

      <div className={"Reward"}>
        <Textbox
          type={"text"}
          placeholder={"Search customers by name"}
          handleChange={handleChange}
          query={query}
        ></Textbox>

        <Button onClick={handleCalculateRewards}>{"Calculate Rewards"}</Button>
        <Button onClick={() => setRewards([])}>{"Close"}</Button>
      </div>

      {prop.Loading ? (
        <Loader />
      ) : (
        <Table
          rewards={filteredCustomers}
          schema={[
            { index: 0, label: "Customer ID" },
            { index: 1, label: "Name" },
            { index: 2, label: "January 2025" },
            { index: 3, label: "February 2025" },
            { index: 4, label: "March 2025" },
            { index: 5, label: "Total Reward Points" },
          ]}
        />
      )}
    </div>
  );
};
