import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";

// Main React Component
export const Transaction = () => {
  const [transactionData, setTransactionData] = useState([]);

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
        setTransactionData(data); // Update state with the fetched data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // Function to calculate reward points
  const flattenedData = transactionData.flatMap((customer) =>
    customer.transactions.map((transaction, index) => ({
      key: `${customer.customerId}-${index}`,
      customerId: customer.customerId,
      name: customer.name,
      month: transaction.month,
      amount: transaction.amount,
    }))
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Table
        tablename={"Transaction Record"}
        tran={flattenedData}
        schema={[
          { index: 0, label: "Customer ID" },
          { index: 1, label: "name" },
          { index: 2, label: "month" },
          { index: 3, label: "amount" },
        ]}
      />
    </div>
  );
};
