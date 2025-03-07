import React, { useState } from "react";

// Sample transaction data
const customerData = [
  {
    customerId: 1,
    name: "Alice",
    transactions: [
      { month: "January", amount: 120 },
      { month: "January", amount: 75 },
      { month: "February", amount: 200 },
      { month: "February", amount: 50 },
      { month: "March", amount: 95 },
    ],
  },
  {
    customerId: 2,
    name: "Bob",
    transactions: [
      { month: "January", amount: 45 },
      { month: "January", amount: 150 },
      { month: "February", amount: 85 },
      { month: "February", amount: 130 },
      { month: "March", amount: 55 },
    ],
  },
  {
    customerId: 3,
    name: "Charlie",
    transactions: [
      { month: "January", amount: 60 },
      { month: "January", amount: 95 },
      { month: "February", amount: 40 },
      { month: "February", amount: 180 },
      { month: "March", amount: 110 },
    ],
  },
  {
    customerId: 4,
    name: "David",
    transactions: [
      { month: "January", amount: 55 },
      { month: "January", amount: 70 },
      { month: "February", amount: 140 },
      { month: "February", amount: 90 },
      { month: "March", amount: 105 },
    ],
  },
  {
    customerId: 5,
    name: "Emma",
    transactions: [
      { month: "January", amount: 130 },
      { month: "January", amount: 85 },
      { month: "February", amount: 75 },
      { month: "February", amount: 60 },
      { month: "March", amount: 200 },
    ],
  },
];

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

// Main React Component
const App = () => {
  const [rewards, setRewards] = useState([]);

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
      <h2>Customer Rewards Program</h2>
      <button onClick={calculateRewards} style={{ marginBottom: "20px" }}>
        Calculate Rewards
      </button>
      
      {rewards.length > 0 && (
        <table border="1" cellPadding="10" style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>January</th>
              <th>February</th>
              <th>March</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {rewards.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.name}</td>
                <td>{customer.monthlyRewards["January"] || 0}</td>
                <td>{customer.monthlyRewards["February"] || 0}</td>
                <td>{customer.monthlyRewards["March"] || 0}</td>
                <td>{customer.totalRewards}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
