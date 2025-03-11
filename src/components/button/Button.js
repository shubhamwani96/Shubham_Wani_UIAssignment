import React from "react";

/**
 *Button Component
 *@param prop onclick and children as props
 *@returns button element
 */

export const Button = (prop) => {
  return <button onClick={prop.onClick}>{prop.children}</button>;
};
