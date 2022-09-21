import { useState } from "react";
import styles from "./RacePicker.module.css";
import ModalModeForm from "../../reusables/ModalModeForm";

import GAME_ACTIONS from "../../../mappings/GAME_ACTIONS";
import GAME_MODE from "../../../mappings/GAME_MODE";

const minScore = 10;

const RacePicker = ({ closeModal, gameDispatch }) => {
  const [finishLine, setFinishLine] = useState(minScore);

  const handleChange = (e) => {
    setFinishLine(e.target.value);
  };

  const storRaceInGameState = () => {
    gameDispatch({ type: GAME_ACTIONS.SET_RACE, payload: finishLine });
    gameDispatch({
      type: GAME_ACTIONS.CHANGE_GAME_MODE,
      payload: GAME_MODE.RACE,
    });

    closeModal();
  };

  return (
    <ModalModeForm
      title={"Set a finish line"}
      setInput={storRaceInGameState}
      closeModal={closeModal}
    >
      <div className={styles["score-input"]}>
        <label htmlFor="min-input">Enter a score :</label>
        <input
          type="number"
          id="min-input"
          name="min-input"
          min={`${minScore}`}
          value={finishLine}
          onChange={handleChange}
        ></input>
        <p className={styles.min}>{`(min: ${minScore})`}</p>
      </div>
    </ModalModeForm>
  );
};

export default RacePicker;
