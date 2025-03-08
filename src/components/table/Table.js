import React from "react";

export const Table = ({ tablename, rewards, schema, tran }) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{tablename}</h2>

      {(rewards && rewards.length > 0) || (tran && tran.length > 0) ? (
        <table border="1" cellPadding="10" style={{ margin: "auto" }}>
          <thead>
            <tr>
              {schema?.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Rendering rewards data */}
            {rewards &&
              rewards.map((customer) => (
                <tr key={customer.customerId}>
                  <td>{customer.customerId}</td>
                  <td>{customer.monthlyRewards["January"] || 0}</td>
                  <td>{customer.monthlyRewards["February"] || 0}</td>
                  <td>{customer.monthlyRewards["March"] || 0}</td>
                  <td>{customer.totalRewards}</td>
                </tr>
              ))}

            {/* Rendering transactions data */}
            {tran &&
              tran.map((transaction) => (
                <tr key={transaction.key}>
                  <td>{transaction.customerId}</td>
                  <td>{transaction.name}</td>
                  <td>{transaction.month}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No data available to display.</p>
      )}
    </div>
  );
};
