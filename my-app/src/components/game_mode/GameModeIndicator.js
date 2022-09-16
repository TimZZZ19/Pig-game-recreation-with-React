import React from "react";
import Timer from "./Timer";
import Race from "./Race";
import GAME_MODE from "../../mappings/GAME_MODE";
import Unselected from "./Unselected";
import styles from "./GameModeIndicator.module.css";

const GameModeIndicator = ({ gameState }) => {
  let mode;
  switch (gameState.gameMode) {
    case GAME_MODE.UNSELECTED:
      mode = <Unselected gameState={gameState} />;
      break;
    case GAME_MODE.WARNING:
      mode = <Unselected gameState={gameState} />;
      break;
    case GAME_MODE.TIMER:
      mode = <Timer />;
      break;
    case GAME_MODE.RACE:
      mode = <Race />;
      break;
    default:
      throw new Error();
  }

  return (
    <div
      className={`${styles["mode-container"]} ${
        gameState.gameMode === GAME_MODE.WARNING && styles["warning"]
      }`}
    >
      {mode}
    </div>
  );
};

export default GameModeIndicator;
