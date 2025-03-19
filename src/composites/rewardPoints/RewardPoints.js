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

  const renderRewardRows = (customers, months) => {
    return customers?.map((customer) => (
      <tr key={customer.customerId}>
        <td>{customer.customerId}</td>
        <td>{customer.name}</td>
        <td>{customer.totalRewards}</td>
        {months?.map((month) => (
          <td key={month}>{customer.monthlyRewards[month] || 0}</td>
        ))}
      </tr>
    ));
  };

  const uniqueMonthYears = extractUniqueMonthYear(filteredCustomers);

  const headers = [
    { columnIndex: 0, label: "Customer ID" },
    { columnIndex: 1, label: "Name" },
    { columnIndex: 2, label: "Total Reward Points" },
  ];

  uniqueMonthYears.forEach((month) => {
    headers.push({
      columnIndex: headers.length,
      label: month,
    });
  });

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
          headers={headers}
          renderRows={renderRewardRows(filteredCustomers, uniqueMonthYears)}
        />
      )}
    </div>
  );
};
