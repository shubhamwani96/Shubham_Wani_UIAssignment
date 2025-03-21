import React from "react";
import { Table } from "../../components/table/Table";
import { transformTransactionData } from "../../utility/TransactionData";
import { Loader } from "../../components/loader/Loader";
import "../../../src/global.css";

/**
 *Transaction Composite to show transaction records
 *@param transactionData Array of transaction data
 *@param Loading boolean to check if data is loading
 *@returns table to show transaction data
 */

export const Transaction = (prop) => {
  // to render table rows for Transaction Records

  const renderTransactionRows = (transactions) => {
    return transactions?.map((transaction) => (
      <tr key={transaction.key}>
        <td>{transaction.customerId}</td>
        <td>{transaction.name}</td>
        <td>{transaction.date}</td>
        <td>{transaction.amount.toFixed(2)}</td>
        <td>{transaction.point}</td>
      </tr>
    ));
  };

  return (
    <div className={"Wrapper"}>
      <h2>{"Transaction Records"}</h2>

      {prop.Loading ? (
        <Loader />
      ) : (
        <Table
          headers={[
            { columnIndex: 0, label: "Customer ID" },
            { columnIndex: 1, label: "Name" },
            { columnIndex: 2, label: "Month" },
            { columnIndex: 3, label: "Amount" },
            { columnIndex: 4, label: "Reward Points" },
          ]}
          renderRows={renderTransactionRows(
            transformTransactionData(prop.transactionData)
          )}
        />
      )}
    </div>
  );
};
