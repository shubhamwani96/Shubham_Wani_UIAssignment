import React from "react";
import "../../../src/global.css";

/**
 *Table Component
 *@param rewards Array of rewards
 *@param headers Array of headers
 *@param transactions Array of transaction
 *@returns table component
 */

export const Table = (prop) => {
  return (
    <div className={"table"}>
      {(prop.rewards && prop.rewards.length > 0) ||
      (prop.transactions && prop.transactions.length > 0) ? (
        <table border="1" cellPadding="10" style={{ margin: "auto" }}>
          <thead>
            <tr>
              {prop.headers?.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prop.rewards?.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.customerId}</td>
                <td>{customer.name}</td>
                <td>
                  {customer.monthlyRewards[prop.uniqueMonthYears[0]] || 0}
                </td>
                <td>
                  {customer.monthlyRewards[prop.uniqueMonthYears[1]] || 0}
                </td>
                <td>
                  {customer.monthlyRewards[prop.uniqueMonthYears[2]] || 0}
                </td>
                <td>{customer.totalRewards}</td>
              </tr>
            ))}
            {prop.transactions?.map((transaction) => {
              return (
                <tr key={transaction.key}>
                  <td>{transaction.customerId}</td>
                  <td>{transaction.name}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.point}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>
          {
            "No data available to display. Please click on the Calculate Rewards button to fetch the data."
          }
        </p>
      )}
    </div>
  );
};
