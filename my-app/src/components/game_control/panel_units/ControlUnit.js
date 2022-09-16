import React from "react";
import styles from "./ControlUnit.module.css";
import Button from "../../reusables/Button";
import UnitTitle from "../../reusables/UnitTitle";
import GAME_STATUS from "../../../mappings/GAME_STATUS";
import GAME_MODE from "../../../mappings/GAME_MODE";

const ControlUnit = ({
  gameMode,
  gameStatus,
  startGame,
  pauseGame,
  openConfirm,
}) => {
  const startBtnText =
    gameMode === GAME_MODE.UNSELECTED || gameStatus === GAME_STATUS.SETTING
      ? "▶️ Start"
      : "▶️ Resume";

  return (
    <div className={styles["control-unit"]}>
      <UnitTitle title={"game control"} />
      <Button
        buttonContent={`${startBtnText}`}
        extraStyles={{ width: "16rem", top: "4rem" }}
        secondaryClass={
          (gameStatus === GAME_STATUS.PLAYING ||
            gameStatus === GAME_STATUS.FROZEN) &&
          "btn--unclickable"
        }
        onClick={startGame}
      />
      <Button
        buttonContent="⏸️ Pause"
        extraStyles={{ width: "16rem", top: "9rem" }}
        secondaryClass={
          gameStatus !== GAME_STATUS.PLAYING && "btn--unclickable"
        }
        onClick={pauseGame}
      />
      <Button
        buttonContent="🔄 Restart"
        extraStyles={{ width: "16rem", top: "14rem" }}
        secondaryClass={gameStatus !== GAME_STATUS.PAUSED && "btn--unclickable"}
        onClick={openConfirm}
      />
    </div>
  );
};

export default ControlUnit;
