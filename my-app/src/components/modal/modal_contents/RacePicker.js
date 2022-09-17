import { useState } from "react";
import styles from "./RacePicker.module.css";
import ModalModeForm from "../../reusables/ModalModeForm";

import GAME_ACTIONS from "../../../mappings/GAME_ACTIONS";

const minScore = 30;

const RacePicker = ({ closeModal, gameDispatch }) => {
  const [finishLine, setFinishLine] = useState(minScore);

  const handleChange = (e) => {
    console.log(finishLine);
    setFinishLine(e.target.value);
  };

  const setRace = () =>
    gameDispatch({ type: GAME_ACTIONS.SET_RACE, payload: finishLine });

  return (
    <ModalModeForm
      title={"Set a finish line"}
      setInput={setRace}
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
        <p className={styles.min}>{`min: ${minScore}`}</p>
      </div>
    </ModalModeForm>
  );
};

export default RacePicker;
