import React from "react";

/**
 *Reusable Button Component
 */

export const Button = (prop) => {
  return <button onClick={prop.onClick}>{prop.children}</button>;
};
