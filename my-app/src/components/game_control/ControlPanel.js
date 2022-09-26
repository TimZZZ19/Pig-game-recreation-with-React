import React from "react";
import styles from "./ControlPanel.module.css";
import Button from "../reusables/Button";
import ModeUnit from "./panel_units/ModeUnit";
import ControlUnit from "./panel_units/ControlUnit";
import GAME_STATUS from "../../mappings/GAME_STATUS";

const ControlPanel = ({
  controlPanelShown,
  handlePanelButton,
  startGame,
  gameState,
  pauseGame,
  openConfirm,
  openTimePicker,
  openRacePicker,
}) => {
  let gameStatusText;
  switch (gameState.gameStatus) {
    case GAME_STATUS.PLAYING:
      gameStatusText = "🟢 playing";
      break;
    case GAME_STATUS.PAUSED:
      gameStatusText = "🔴 paused";
      break;
    case GAME_STATUS.SETTING:
      gameStatusText = "🟠 setting";
      break;
    case GAME_STATUS.FROZEN:
      gameStatusText = "⏹️ frozen";
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
        onClick={handlePanelButton}
      />

      <ModeUnit
        gameState={gameState}
        openTimePicker={openTimePicker}
        openRacePicker={openRacePicker}
      />

      <ControlUnit
        gameState={gameState}
        startGame={startGame}
        pauseGame={pauseGame}
        openConfirm={openConfirm}
      />
    </div>
  );
};

export default ControlPanel;
