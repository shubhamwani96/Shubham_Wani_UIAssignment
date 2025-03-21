import React from "react";

/**
 *Textbox Component
 *@param type of input element
 *@param value of input element
 *@param handleChange function to be called on text input
 *@param placeholder text to be shown as placeholder
 *@returns textbox element
 */

export const Textbox = (prop) => {
  
  return (
    <input
      type={prop.type}
      value={prop.value}
      onChange={prop.handleChange}
      placeholder={prop.placeholder}
    />
  );
};
