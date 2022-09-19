import { useRef } from "react";
import styles from "./TimePicker.module.css";
import ModalModeForm from "../../reusables/ModalModeForm";

import GAME_ACTIONS from "../../../mappings/GAME_ACTIONS";
import GAME_MODE from "../../../mappings/GAME_MODE";

const TimePicker = ({ closeModal, gameDispatch }) => {
  const minInput = useRef();
  const secInput = useRef();

  const storeTimeInGameState = () => {
    const seconds = +minInput.current.value * 60 + +secInput.current.value;
    gameDispatch({ type: GAME_ACTIONS.SET_TIMER_TIME, payload: seconds });
    gameDispatch({
      type: GAME_ACTIONS.CHANGE_GAME_MODE,
      payload: GAME_MODE.TIMER,
    });
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
