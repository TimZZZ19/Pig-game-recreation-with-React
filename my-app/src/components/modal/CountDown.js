import { useState } from "react";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";

const CountDown = ({ modalDispatch }) => {
  const [counter, setCounter] = useState(3);

  setTimeout(() => {
    modalDispatch({ type: MODAL_ACTIONS.CLOSE_MODAL });
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_NULL });
  }, 4000);

  const countDown = setInterval(function () {
    setCounter((curr) => curr--);
    if (counter === 0) {
      clearInterval(countDown);
    }
  }, 1000);

  // countDown();

  return <div>{counter}</div>;
};

export default CountDown;
