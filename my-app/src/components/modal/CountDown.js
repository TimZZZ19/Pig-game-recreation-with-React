import { useState, useRef, useEffect } from "react";
import COUNT_DOWN from "../../mappings/COUNT_DOWN.js";

const CountDown = () => {
  const [counter, setCounter] = useState(COUNT_DOWN.TIME);
  const id = useRef();
  const clear = () => {
    clearInterval(id.current);
  };

  useEffect(() => {
    id.current = setInterval(() => {
      setCounter((curr) => --curr);
    }, 1000);
    return () => clear();
  }, []);

  useEffect(() => {
    if (counter === 0) {
      setCounter("Go!");
      clear();
    }
  }, [counter]);

  return <div>{counter}</div>;
};

export default CountDown;
