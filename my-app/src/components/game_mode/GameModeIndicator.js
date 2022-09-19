import React from "react";

import GAME_MODE from "../../mappings/GAME_MODE";
import Unselected from "./Unselected";
import styles from "./GameModeIndicator.module.css";

const convertTimeFiguresToString = (time) => {
  const minutes = "0" + Math.floor(time / 60);
  const seconds = "0" + (time - minutes * 60);
  return minutes.slice(-2) + " : " + seconds.slice(-2);
};

const GameModeIndicator = ({ gameState }) => {
  const { gameMode, timer, race } = gameState;

  const formatedTime = convertTimeFiguresToString(timer);

  let mode;
  switch (gameMode) {
    case GAME_MODE.UNSELECTED:
      mode = <Unselected gameMode={gameMode} />;
      break;
    case GAME_MODE.WARNING:
      mode = <Unselected gameMode={gameMode} />;
      break;
    case GAME_MODE.TIMER:
      mode = formatedTime;
      break;
    case GAME_MODE.RACE:
      mode = race;
      break;
    default:
      throw new Error();
  }

  return (
    <div
      className={`${styles["mode-container"]} ${
        gameMode === GAME_MODE.WARNING && styles["warning"]
      }`}
    >
      {mode}
    </div>
  );
};

export default GameModeIndicator;
