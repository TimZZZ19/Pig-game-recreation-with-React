import React from "react";
import styles from "./TimePicker.module.css";
import ModalModeForm from "../../reusables/ModalModeForm";

const TimePicker = ({ closeModal }) => {
  return (
    <ModalModeForm title={"Set a timer"} closeModal={closeModal}>
      <div className={styles["timer-inputs"]}>
        <div className={styles["input"]}>
          <input
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

const secondsToMinSecPadded = (time) => {
  const minutes = "0" + Math.floor(time / 60);
  const seconds = "0" + (time - minutes * 60);
  return minutes.substring(-2) + ":" + seconds.substring(-2);
};

console.log(secondsToMinSecPadded(240));
