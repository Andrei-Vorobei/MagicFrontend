import { useState } from "react";

export const useCount = (init: number) => {
  const [count, setCount] = useState<number>(init);

  const increment = () => {
    setCount(state => ++state);
  };

  const decrement = () => {
    setCount(state => --state);
  };

  const reset = () => {
    setCount(0);
  }

  return {
    increment,
    decrement,
    reset,
    count
  };
};
