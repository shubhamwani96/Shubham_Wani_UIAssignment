import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";
import "../../../src/global.css";
import "../../../src/composites/rewardPoints/rewardStyles.css";
import { Button } from "../../components/button/Button";
import { Textbox } from "../../components/textbox/Textbox";
import { calculateMonthlyRewardPoints } from "../../utility/CalculateMonthlyRewardPoints";
import { useDebounce } from "../../utility/Debounce";
import { Loader } from "../../components/loader/Loader";
import { extractUniqueMonthYear } from "../../utility/ExtractMonthYear";

/**
 *RewardPoints Composite to show Monthly and Total Reward Points
 *@param rewardData Array of customer reward data
 *@param Loading boolean to check if data is loading
 *@returns table to show Monthly and Total Reward Data data
 */

export const RewardPoints = (prop) => {
  const [rewards, setRewards] = useState([]);
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

  const handleCalculateRewards = () => {
    const summary = calculateMonthlyRewardPoints(prop.rewardData);
    setRewards(summary);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  
  const uniqueMonthYears = extractUniqueMonthYear(filteredCustomers);

  return (
    <div className={"Wrapper"}>
      <h2>{"Customer Reward Program"}</h2>

      <div className={"Reward"}>
        <Textbox
          type={"text"}
          placeholder={"Search customers by name"}
          handleChange={handleChange}
          value={query}
        ></Textbox>

        <Button onClick={handleCalculateRewards}>{"Calculate Rewards"}</Button>
        <Button onClick={() => setRewards([])}>{"Close"}</Button>
      </div>

      {prop.Loading ? (
        <Loader />
      ) : (
        <Table
          rewards={filteredCustomers}
          headers={[
            { index: 0, label: "Customer ID" },
            { index: 1, label: "Name" },
            { index: 2, label: uniqueMonthYears[0] },
            { index: 3, label: uniqueMonthYears[1] },
            { index: 4, label: uniqueMonthYears[2] },
            { index: 5, label: "Total Reward Points" },
          ]}
          uniqueMonthYears={uniqueMonthYears}
        />
      )}
    </div>
  );
};
