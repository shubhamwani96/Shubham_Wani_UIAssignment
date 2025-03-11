import { useEffect, useState } from "react";

/**
 *Debouncing function for name search
 *@param prop value, delay as a props"
 *@returns The hook returns the debouncedValue, which will only update after the user stops changing the value.
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
