import React from "react";

/**
 *Reusable Textbox Component
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
