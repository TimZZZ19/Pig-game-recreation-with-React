import React from "react";
import styles from "./ControlUnit.module.css";
import Button from "../../reusables/Button";
import UnitTitle from "../../reusables/UnitTitle";
import STATUS from "../../../mappings/STATUS";

const ControlUnit = ({
  openModalandStartCounting,
  initializeBoard,
  gameStatus,
  setGameStatus,
  pauseGame,
}) => {
  const startBtnText = gameStatus === STATUS.PAUSED ? "▶️ Resume" : "▶️ Start";
  const startResumeFunc = () => {
    setGameStatus(STATUS.COUNTING);
    openModalandStartCounting();
    if (gameStatus !== STATUS.PAUSED) initializeBoard();
    setTimeout(() => setGameStatus(STATUS.PLAYING), 6000);
  };

  return (
    <div className={styles["control-unit"]}>
      <UnitTitle title={"game control"} />
      <Button
        buttonContent={`${startBtnText}`}
        extraStyles={{ width: "16rem", top: "4rem" }}
        secondaryClass={gameStatus === STATUS.PLAYING && "btn--unclickable"}
        onClick={startResumeFunc}
      />
      <Button
        buttonContent="⏸️ Pause"
        extraStyles={{ width: "16rem", top: "9rem" }}
        secondaryClass={gameStatus !== STATUS.PLAYING && "btn--unclickable"}
        onClick={pauseGame}
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
