import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";

export const Transaction = () => {
  const [transactionData, setTransactionData] = useState([]);

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
        setTransactionData(data);
        /**
         *Update state with the fetched data
         */
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
      points += (purchaseAmount - 100) * 2;
      points += 50;
    } else if (purchaseAmount > 50) {
      points += purchaseAmount - 50;
    }

    return points;
  };

  const flattenedData = transactionData.flatMap((customer) =>
    customer.transactions.map((transaction, index) => ({
      key: `${customer.customerId}-${index}`,
      customerId: customer.customerId,
      name: customer.name,
      month: transaction.month,
      amount: transaction.amount,
      point: calculateRewardPoints(transaction.amount),
    }))
  );

  return (
    <div className={"Wrapper"}>
      <Table
        tablename={"Transaction Record"}
        tran={flattenedData}
        schema={[
          { index: 0, label: "Customer ID" },
          { index: 1, label: "Name" },
          { index: 2, label: "Month" },
          { index: 3, label: "Amount" },
          { index: 3, label: "Reward Points" },
        ]}
      />
    </div>
  );
};
