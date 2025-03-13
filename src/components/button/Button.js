import React from "react";

/**
 *Button Component
 *@param onclick function to be called on button click
 *@param children text of the button or children of the button
 *@returns button element
 */

export const Button = (prop) => {
  return <button onClick={prop.onClick}>{prop.children}</button>;
};
