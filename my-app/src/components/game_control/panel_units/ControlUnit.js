import React from "react";
import styles from "./ControlUnit.module.css";
import Button from "../../reusables/Button";
import UnitTitle from "../../reusables/UnitTitle";
import STATUS from "../../../mappings/STATUS";
import PushBack from "../../reusables/PushBack";

const ControlUnit = ({
  countDown,
  initializeBoard,
  gameStatus,
  setGameStatus,
}) => {
  const startBtnText = gameStatus === STATUS.SETTING ? "▶️ Start" : "▶️ Resume";
  const startResumeFunc = () => {
    setGameStatus(STATUS.COUNTING);
    countDown();

    // Initialize the board when first starting the game from the setting status
    if (gameStatus !== STATUS.PAUSED) PushBack(initializeBoard);

    PushBack(() => setGameStatus(STATUS.PLAYING));
  };

  const pauseFunc = () => setGameStatus(STATUS.PAUSED);

  return (
    <div className={styles["control-unit"]}>
      <UnitTitle title={"game control"} />
      <Button
        buttonContent={`${startBtnText}`}
        extraStyles={{ width: "16rem", top: "4rem" }}
        secondaryClass={
          (gameStatus === STATUS.PLAYING || gameStatus === STATUS.COUNTING) &&
          "btn--unclickable"
        }
        onClick={startResumeFunc}
      />
      <Button
        buttonContent="⏸️ Pause"
        extraStyles={{ width: "16rem", top: "9rem" }}
        secondaryClass={gameStatus !== STATUS.PLAYING && "btn--unclickable"}
        onClick={pauseFunc}
      />
      <Button
        buttonContent="🔄 Restart"
        extraStyles={{ width: "16rem", top: "14rem" }}
        secondaryClass={gameStatus !== STATUS.PAUSED && "btn--unclickable"}
      />
    </div>
  );
};

export default ControlUnit;
