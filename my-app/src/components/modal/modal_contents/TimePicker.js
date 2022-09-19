import { useState } from "react";
import styles from "./TimePicker.module.css";
import ModalModeForm from "../../reusables/ModalModeForm";

import GAME_ACTIONS from "../../../mappings/GAME_ACTIONS";
import GAME_MODE from "../../../mappings/GAME_MODE";

const TimePicker = ({ closeModal, gameDispatch }) => {
  const [minInput, setMinInput] = useState(1);
  const [secInput, setSecInput] = useState(0);

  const storeTimeInGameState = () => {
    const seconds = +minInput * 60 + +secInput;
    gameDispatch({ type: GAME_ACTIONS.SET_TIMER_TIME, payload: seconds });
    gameDispatch({
      type: GAME_ACTIONS.CHANGE_GAME_MODE,
      payload: GAME_MODE.TIMER,
    });
  };

  const handleMinInput = (e) => {
    console.log(e.target.value);

    setMinInput(e.target.value);
  };

  const handleSecInput = (e) => {
    console.log(e.target.value);

    setSecInput(e.target.value);
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
            type="number"
            id="min-input"
            name="min-input"
            min="1"
            max="59"
            value={minInput}
            onChange={handleMinInput}
          ></input>
          <label htmlFor="min-input">Min</label>
        </div>
        <div className={styles["input"]}>
          <input
            type="number"
            id="sec-input"
            name="sec-input"
            min="0"
            max="59"
            value={secInput}
            onChange={handleSecInput}
          ></input>
          <label htmlFor="sec-input">Sec</label>
        </div>
      </div>
    </ModalModeForm>
  );
};

export default TimePicker;
