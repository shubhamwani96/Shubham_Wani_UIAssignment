import { useEffect, useState } from "react";

/**
 *Debouncing function for name search
 *@argument value current state or input value that is being processed by the debounced function
 *@argument delay specifies the amount of time (in milliseconds) to wait after the last event before executing the debounced function
 *@returns the debouncedValue, which will only update after the user stops changing the value
 */

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
