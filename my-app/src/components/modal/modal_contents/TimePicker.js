import { useRef } from "react";
import styles from "./TimePicker.module.css";
import ModalModeForm from "../../reusables/ModalModeForm";

import GAME_ACTIONS from "../../../mappings/GAME_ACTIONS";

const TimePicker = ({ closeModal, gameDispatch }) => {
  const minInput = useRef();
  const secInput = useRef();

  const storeTimeInGameState = () => {
    const seconds = +minInput.current.value*60 + +secInput.current.value; 
    gameDispatch({type:GAME_ACTIONS.SET_TIMER, payload:seconds})

  };

  return (
    <ModalModeForm
      title={"Set a timer"}
      setInput={storeTimeInGameState}
      closeModal={closeModal}
    >
      <div className={styles["timer-inputs"]}>
        <div className={styles["input"]}>
          <input
            ref={minInput}
            type="number"
            id="min-input"
            name="min-input"
            min="1"
            max="59"
          ></input>
          <label htmlFor="min-input">Min</label>
        </div>
        <div className={styles["input"]}>
          <input
            ref={secInput}
            type="number"
            id="sec-input"
            name="sec-input"
            min="0"
            max="59"
          ></input>
          <label htmlFor="sec-input">Sec</label>
        </div>
      </div>
    </ModalModeForm>
  );
};

export default TimePicker;

// const secondsToMinSecPadded = (time) => {
//   const minutes = "0" + Math.floor(time / 60);
//   const seconds = "0" + (time - minutes * 60);
//   return minutes.substring(-2) + ":" + seconds.substring(-2);
// };

// console.log(secondsToMinSecPadded(240));
