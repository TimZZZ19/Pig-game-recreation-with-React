import React from "react";
import Timer from "./Timer";
import FinishLine from "./FinishLine";
import MODE from "../../../mappings/MODE";
import styles from "./GameMode.module.css";

const GameMode = ({ gameMode }) => {
  let gameModeContent;
  switch (gameMode) {
    case MODE.TIMER:
      gameModeContent = <Timer />;
      break;
    case MODE.FINISH_lINE:
      gameModeContent = <FinishLine />;
      break;
    default:
      throw new Error();
  }

  return <div className={styles["mode-container"]}>GameMode</div>;
};

export default GameMode;
