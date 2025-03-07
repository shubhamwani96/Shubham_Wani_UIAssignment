import React from "react";
import "../../../src/global.css";

export const Table = (prop) => {
  return (
    <div className="Wrapper">
      <h2>{prop.tablename}</h2>

      {(prop.rewards && prop.rewards.length > 0) ||
      (prop.tran && prop.tran.length > 0) ? (
        <table border="1" cellPadding="10" style={{ margin: "auto" }}>
          <thead>
            <tr>
              {prop.schema?.map((column, index) => (
                <th key={index.February}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prop.rewards?.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.customerId}</td>
                <td>{customer.name}</td>
                <td>{customer.monthlyRewards["January"] || 0}</td>
                <td>{customer.monthlyRewards["February"] || 0}</td>
                <td>{customer.monthlyRewards["March"] || 0}</td>
                <td>{customer.totalRewards}</td>
              </tr>
            ))}
            {prop.tran?.map((transaction) => (
              <tr key={transaction.key}>
                <td>{transaction.customerId}</td>
                <td>{transaction.name}</td>
                <td>{transaction.month}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>
          {
            "No data available to display. Please click on the below button to fetch the data."
          }
        </p>
      )}
    </div>
  );
};
