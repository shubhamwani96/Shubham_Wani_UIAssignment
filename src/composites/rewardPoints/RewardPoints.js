import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";
import "../../../src/global.css";
import "../../../src/composites/rewardPoints/rewardStyles.css";
import { Button } from "../../components/button/Button";
import { calculateRewardPoints } from "../../utility/CalculateRewardPoints";

export const RewardPoints = (prop) => {
  const [rewards, setRewards] = useState([]);
  const [rewardCustomerData, setRewardCustomerData] = useState([]);

  // Custom hook to implement debouncing
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const [query, setQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(rewards);

  // Get the debounced query value
  const debouncedQuery = useDebounce(query, 500);

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

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (prop.rewardData?.length > 0) {
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
        const formatMonth = new Date(month).toLocaleString("default", {
          month: "long",
        });
        const points = calculateRewardPoints(amount);
        monthlyRewards[formatMonth] =
          (monthlyRewards[formatMonth] || 0) + points;
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
      <h2>{"Customer Reward Program"}</h2>

      <div className={"Reward"}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search customers by name"
        />
        <Button onClick={calculateMonthlyRewardPoints}>
          {"Calculate Rewards"}
        </Button>
        <Button onClick={() => setRewards([])}>{"Close"}</Button>
      </div>
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
    </div>
  );
};
