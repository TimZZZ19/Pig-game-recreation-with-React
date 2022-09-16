import React from "react";
import styles from "./ControlUnit.module.css";
import Button from "../../reusables/Button";
import UnitTitle from "../../reusables/UnitTitle";
import STATUS from "../../../mappings/STATUS";
import MODE from "../../../mappings/MODE";

const ControlUnit = ({
  gameMode,
  gameStatus,
  startGame,
  pauseGame,
  openConfirm,
}) => {
  const startBtnText =
    gameMode === MODE.UNSELECTED || gameStatus === STATUS.SETTING
      ? "▶️ Start"
      : "▶️ Resume";

  return (
    <div className={styles["control-unit"]}>
      <UnitTitle title={"game control"} />
      <Button
        buttonContent={`${startBtnText}`}
        extraStyles={{ width: "16rem", top: "4rem" }}
        secondaryClass={
          (gameStatus === STATUS.PLAYING || gameStatus === STATUS.FROZEN) &&
          "btn--unclickable"
        }
        onClick={startGame}
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
        onClick={openConfirm}
      />
    </div>
  );
};

export default ControlUnit;
