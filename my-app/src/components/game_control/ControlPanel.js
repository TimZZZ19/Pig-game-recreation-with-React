import React from "react";
import styles from "./ControlPanel.module.css";
import Button from "../reusables/Button";
import ModeUnit from "./panel_units/ModeUnit";
import ControlUnit from "./panel_units/ControlUnit";
import STATUS from "../../mappings/STATUS";

const ControlPanel = ({
  controlPanelShown,
  handleExpandButton,
  countDown,
  initializeBoard,
  gameMode,
  setGameMode,
  gameStatus,
  setGameStatus,
  openConfirm,
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
    case STATUS.FROZEN:
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
        onClick={handleExpandButton}
      />

      <ModeUnit
        gameMode={gameMode}
        setGameMode={setGameMode}
        gameStatus={gameStatus}
      />

      <ControlUnit
        countDown={countDown}
        initializeBoard={initializeBoard}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        openConfirm={openConfirm}
      />
    </div>
  );
};

export default ControlPanel;
