import React from "react";
import "../../../src/global.css";

/**
 *Table Component
 *@param headers Array of headers
 *@param renderRows Array of transaction data
 *@returns table component
 */

export const Table = (prop) => {
  
  return (
    <div className={"table"}>
      {prop.renderRows && prop.renderRows.length > 0 ? (
        <table border="1" cellPadding="10" style={{ margin: "auto" }}>
          <thead>
            <tr>
              {prop.headers?.map((column) => (
                <th key={column.columnIndex}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>{prop.renderRows}</tbody>
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
