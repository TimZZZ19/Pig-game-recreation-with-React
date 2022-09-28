import React from "react";
import styles from "./ControlPanel.module.css";
import SidePanelWrapper from "../reusables/SidePanelWrapper";

import ModeUnit from "./panel_units/ModeUnit";
import ControlUnit from "./panel_units/ControlUnit";
import GAME_STATUS from "../../mappings/GAME_STATUS";

const ControlPanel = ({
  controlPanelShown,
  handleControlPanelSideButton,
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
    <SidePanelWrapper
      panelDefaultPosition={{ transform: "translateX(100%)" }}
      sidePanelShown={controlPanelShown}
      controlBtnContent="⏩"
      controlBtnHorizontalLocation={{ left: "80%" }}
      handleSidePanelBtn={handleControlPanelSideButton}
    >
      <h2 className={`${styles["game-status-text"]}`}>{gameStatusText}</h2>

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
    </SidePanelWrapper>
  );
};

export default ControlPanel;
