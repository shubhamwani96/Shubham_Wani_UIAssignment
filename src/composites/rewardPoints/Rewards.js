import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";

// Main React Component
export const Rewards = () => {
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
    const purchaseAmount = parseFloat(amount);

    let points = 0;
    if (purchaseAmount > 100) {
      points += (purchaseAmount - 100) * 2; // 2 points for each dollar over $100
      points += 50; // 50 points for the $50 between $50 and $100
    } else if (purchaseAmount > 50) {
      points += purchaseAmount - 50; // 1 point for each dollar over $50
    }

    return points;
  };
  console.log(calculatePoints);

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
        schema={[
          { index: 0, label: "Customer ID" },
          { index: 1, label: "January" },
          { index: 2, label: "February" },
          { index: 3, label: "March" },
          { index: 4, label: "Total Points" },
        ]}
      />

      <button onClick={calculateRewards} style={{ marginBottom: "20px" }}>
        Calculate Rewards
      </button>
    </div>
  );
};
