import React from "react";
import { Table } from "../../components/table/Table";
import { transactionDataFunction } from "../../utility/TransactionData";
import { Loader } from "../../components/loader/Loader";

/**
 *Transaction Composite to show transaction records
 *@param transactionData Array of transaction data
 *@param Loading boolean to check if data is loading
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
          transaction={transactionDataFunction(prop.transactionData)}
          schema={[
            { index: 0, label: "Customer ID" },
            { index: 1, label: "Name" },
            { index: 2, label: "Month" },
            { index: 3, label: "Amount" },
            { index: 4, label: "Reward Points" },
          ]}
        />
      )}
      ;
    </div>
  );
};
