import React, { useEffect, useState } from "react";
import { Table } from "../../components/table/Table";
import { TransactionData } from "../../utility/TransactionData";

/**
 *Transaction Composite to show transaction records
 *@param prop transactionData Array as a props"
 *@returns table to show transaction data
 */

export const Transaction = (prop) => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    if (prop.transactionData?.length > 0) {
      setTransactionData(prop.transactionData);
    } else {
      setTransactionData([]);
    }
  }, [prop.transactionData]);

  return (
    <div className={"Wrapper"}>
      <Table
        tablename={"Transaction Records"}
        tran={TransactionData(transactionData)}
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
