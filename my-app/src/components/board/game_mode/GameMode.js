import React from "react";
import Timer from "./Timer";
import FinishLine from "./FinishLine";
import MODE from "../../../mappings/MODE";
import styles from "./GameMode.module.css";

const GameMode = ({ gameMode }) => {
  let mode;
  switch (gameMode) {
    case MODE.TIMER:
      mode = <Timer />;
      break;
    case MODE.FINISH_lINE:
      mode = <FinishLine />;
      break;
    default:
      throw new Error();
  }

  return <div className={styles["mode-container"]}>{mode}</div>;
};

export default GameMode;
