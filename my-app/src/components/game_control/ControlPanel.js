import React from "react";
import styles from "./ControlPanel.module.css";
import Button from "../reusables/Button";
import ModeUnit from "./panel_units/ModeUnit";
import ControlUnit from "./panel_units/ControlUnit";
import STATUS from "../../mappings/STATUS";

const ControlPanel = ({
  controlPanelShown,
  handleExpandButton,
  openModalandStartCounting,
  initializeBoard,
  pauseGame,
  gameMode,
  setGameMode,
  gameStatus,
  setGameStatus,
}) => {
  let gameStatusText;
  switch (gameStatus) {
    case STATUS.PLAYING:
      gameStatusText = "🟢 playing";
      break;
    case STATUS.PAUSED:
      gameStatusText = "🔴 paused";
      break;
    case STATUS.SETTING:
      gameStatusText = "🟠 setting";
      break;
    case STATUS.COUNTING:
      gameStatusText = "🕜 counting";
      break;
    default:
      throw new Error();
  }

  return (
    <div
      className={`${styles["control-panel"]} ${
        controlPanelShown && styles["control-panel--show"]
      }`}
    >
      <h2 className={`${styles["game-status-text"]}`}>{gameStatusText}</h2>
      <Button
        buttonContent="⏩"
        extraStyles={{ width: "4.2rem", top: "2rem", left: "80%" }}
        onClick={handleExpandButton}
      />

      <ModeUnit
        gameMode={gameMode}
        setGameMode={setGameMode}
        gameStatus={gameStatus}
      />

      <ControlUnit
        openModalandStartCounting={openModalandStartCounting}
        initializeBoard={initializeBoard}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        pauseGame={pauseGame}
      />
    </div>
  );
};

export default ControlPanel;
