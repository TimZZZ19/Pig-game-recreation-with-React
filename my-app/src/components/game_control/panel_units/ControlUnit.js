import React from "react";
import styles from "./ControlUnit.module.css";
import Button from "../../reusables/Button";
import UnitTitle from "../../reusables/UnitTitle";
import GAME_STATUS from "../../../mappings/GAME_STATUS";
import GAME_MODE from "../../../mappings/GAME_MODE";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const ControlUnit = ({ gameState, startGame, pauseGame, openConfirm }) => {
  const startBtnText =
    gameState.gameMode === GAME_MODE.UNSELECTED ||
    gameState.gameStatus === GAME_STATUS.SETTING
      ? "▶️ Start"
      : "▶️ Resume";

  const handleClick = () => {
    socket.emit("send_message", { message: "hello" });
  };

  return (
    <div className={styles["control-unit"]}>
      <UnitTitle title={"game control"} />
      <Button
        buttonContent={`test`}
        extraStyles={{ width: "16rem", top: "24rem" }}
        onClick={handleClick}
      />
      <Button
        buttonContent={`${startBtnText}`}
        extraStyles={{ width: "16rem", top: "4rem" }}
        secondaryClass={
          (gameState.gameStatus === GAME_STATUS.PLAYING ||
            gameState.gameStatus === GAME_STATUS.FROZEN) &&
          "btn--unclickable"
        }
        onClick={startGame}
      />
      <Button
        buttonContent="⏸️ Pause"
        extraStyles={{ width: "16rem", top: "9rem" }}
        secondaryClass={
          gameState.gameStatus !== GAME_STATUS.PLAYING && "btn--unclickable"
        }
        onClick={pauseGame}
      />
      <Button
        buttonContent="🔄 Restart"
        extraStyles={{ width: "16rem", top: "14rem" }}
        secondaryClass={
          gameState.gameStatus !== GAME_STATUS.PAUSED && "btn--unclickable"
        }
        onClick={openConfirm}
      />
    </div>
  );
};

export default ControlUnit;
