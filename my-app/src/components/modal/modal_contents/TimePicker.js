import { useState } from "react";
import styles from "./TimePicker.module.css";
import ModalModeForm from "../../reusables/ModalModeForm";

import GAME_ACTIONS from "../../../mappings/GAME_ACTIONS";
import GAME_MODE from "../../../mappings/GAME_MODE";
import PLAYER_ACTIONS from "../../../mappings/PLAYER_ACTIONS";
import TIMER_SETTING from "../../../mappings/TIMER_SETTING";

const { MIN_TIME } = TIMER_SETTING;

const TimePicker = ({
  closeModal,
  gameDispatch,
  playerADispatch,
  playerBDispatch,
}) => {
  const [minInput, setMinInput] = useState(0);
  const [secInput, setSecInput] = useState(MIN_TIME);
  const [timeInvalid, setTimeInvalid] = useState(false);

  const storeTimeInPlayerStates = () => {
    const seconds = +minInput * 60 + +secInput;
    if (seconds < MIN_TIME) {
      setTimeInvalid(true);
    } else {
      // COMMENT Game mode is stored in GameState while timer is stored in PlayerState
      playerADispatch({ type: PLAYER_ACTIONS.SET_TIME, payload: seconds });
      playerBDispatch({ type: PLAYER_ACTIONS.SET_TIME, payload: seconds });
      gameDispatch({
        type: GAME_ACTIONS.CHANGE_GAME_MODE,
        payload: GAME_MODE.TIMER,
      });
      closeModal();
    }
  };

  const handleMinInput = (e) => {
    setMinInput(e.target.value);
  };

  const handleSecInput = (e) => {
    setSecInput(e.target.value);
  };

  return (
    <ModalModeForm
      title={"Set a timer"}
      setInput={storeTimeInPlayerStates}
      closeModal={closeModal}
    >
      <div className={styles["timer-inputs"]}>
        <div className={styles["input"]}>
          <input
            type="number"
            id="min-input"
            name="min-input"
            min="0"
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
            className={`${timeInvalid && styles["invalid-time"]}`}
            name="sec-input"
            min="0"
            max="59"
            value={secInput}
            onChange={handleSecInput}
          ></input>
          <label htmlFor="sec-input">Sec</label>
        </div>
        <p
          className={`${styles["warning-text"]} ${
            timeInvalid && styles["invalid-warning"]
          }`}
        >
          Time can't be less than {MIN_TIME} seconds.
        </p>
      </div>
    </ModalModeForm>
  );
};

export default TimePicker;
