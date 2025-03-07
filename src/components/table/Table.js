import React from "react";
export const Table = (prop) => {
  console.log(prop.tablename);
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{prop.tablename}</h2>
      {prop.rewards && prop.rewards?.length > 0 && (
        <table border="1" cellPadding="10" style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>{prop.heading1}</th>
              <th>{prop.heading2}</th>
              <th>{prop.heading3}</th>
              <th>{prop.heading4}</th>
              <th>{prop.heading5}</th>
            </tr>
          </thead>
          <tbody>
            {prop.rewards.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.customerId}</td>
                <td>{customer.monthlyRewards["January"] || 0}</td>
                <td>{customer.monthlyRewards["February"] || 0}</td>
                <td>{customer.monthlyRewards["March"] || 0}</td>
                <td>{customer.totalRewards}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
