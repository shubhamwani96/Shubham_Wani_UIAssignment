import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";
import { calculateRewardPoints } from "../../utility/CalculateRewardPoints";

export const Transaction = (prop) => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    if (prop.transactionData?.length > 0) {
      setTransactionData(prop.transactionData);
    } else {
      setTransactionData([]);
    }
  }, [prop.transactionData]);

  /**
   *Empty dependency array ensures this effect runs only once after the initial render
   */

  /**
   * Function to calculate reward points for each transaction
   */

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
        tablename={"Transaction Records"}
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
