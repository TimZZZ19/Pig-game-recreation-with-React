import { useState, useRef, useEffect } from "react";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";

const CountDown = ({ modalDispatch }) => {
  const [counter, setCounter] = useState(5);
  const id = useRef();
  const clear = () => {
    clearInterval(id.current);
  };

  useEffect(() => {
    id.current = setInterval(() => {
      setCounter((curr) => --curr);
    }, 1000);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      setCounter("Go!");
      clear();
    }
  }, [counter]);

  // Close the modal and reset its content back to null
  setTimeout(() => {
    modalDispatch({ type: MODAL_ACTIONS.CLOSE_MODAL });
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_NULL });
  }, 6000);

  return <div>{counter}</div>;
};

export default CountDown;
