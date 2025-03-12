import React from "react";
import { Table } from "../../components/table/Table";
import { TransactionData } from "../../utility/TransactionData";
import { Loader } from "../../components/loader/Loader";

/**
 *Transaction Composite to show transaction records
 *@param prop transactionData Array as a props"
 *@returns table to show transaction data
 */

export const Transaction = (prop) => {
  return (
    <div className={"Wrapper"}>
      <h2>{"Transaction Records"}</h2>
      {prop.Loading ? (
        <Loader />
      ) : (
        <Table
          tran={TransactionData(prop.transactionData)}
          schema={[
            { index: 0, label: "Customer ID" },
            { index: 1, label: "Name" },
            { index: 2, label: "Month" },
            { index: 3, label: "Amount" },
            { index: 3, label: "Reward Points" },
          ]}
        />
      )}
      ;
    </div>
  );
};
