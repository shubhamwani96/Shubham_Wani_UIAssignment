import React from "react";

/**
 *Textbox Component
 *@param prop type, query, handleChange and placeholder as props
 *@returns textbox element
 */

export const Textbox = (prop) => {
  return (
    <input
      type={prop.type}
      value={prop.query}
      onChange={prop.handleChange}
      placeholder={prop.placeholder}
    />
  );
};
