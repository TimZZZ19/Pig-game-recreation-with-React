import React from "react";
import Timer from "./Timer";
import Race from "./Race";
import MODE from "../../mappings/MODE";
import styles from "./GameModeIndicator.module.css";

const GameModeIndicator = ({ gameMode }) => {
  let mode;
  switch (gameMode) {
    case MODE.TIMER:
      mode = <Timer />;
      break;
    case MODE.RACE:
      mode = <Race />;
      break;
    default:
      throw new Error();
  }

  return <div className={styles["mode-container"]}>{mode}</div>;
};

export default GameModeIndicator;
