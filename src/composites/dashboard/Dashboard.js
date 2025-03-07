import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";

// Main React Component
export const Dashboard = () => {
  const [rewards, setRewards] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    // Fetch data from the local JSON file
    fetch("http://localhost:3000/CustomerData.json")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCustomerData(data); // Update state with the fetched data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // Function to calculate reward points

  const calculatePoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2;
      amount = 100;
    }
    if (amount > 50) {
      points += (amount - 50) * 1;
    }
    return points;
  };

  // Process transactions to calculate rewards
  const calculateRewards = () => {
    const rewardSummary = customerData.map((customer) => {
      let monthlyRewards = {};
      let totalRewards = 0;

      customer.transactions.forEach(({ month, amount }) => {
        const points = calculatePoints(amount);
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Table
        tablename={"Customer Rewards Program"}
        rewards={rewards}
        heading1={"Customer ID"}
        heading2={"January"}
        heading3={"February"}
        heading4={"March"}
        heading5={"Total Points"}
      />
      <button onClick={calculateRewards} style={{ marginBottom: "20px" }}>
        Calculate Rewards
      </button>
    </div>
  );
};
