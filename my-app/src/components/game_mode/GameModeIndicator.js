import React from "react";

import GAME_MODE from "../../mappings/GAME_MODE";
import styles from "./GameModeIndicator.module.css";

const GameModeIndicator = ({ gameState, playerAState, playerBState }) => {
  const { gameMode, race } = gameState;

  const formatedTime1 = convertTimeFiguresToString(playerAState.timer);
  const formatedTime2 = convertTimeFiguresToString(playerBState.timer);

  let mode;
  switch (gameMode) {
    case GAME_MODE.UNSELECTED:
    case GAME_MODE.WARNING:
      mode = (
        <p
          className={`${styles["indicator-content"]} ${styles["initial-text"]} `}
        >
          {"Please choose your game mode"}
        </p>
      );
      break;
    case GAME_MODE.TIMER:
      mode = (
        <>
          <div
            className={`${styles["indicator-content"]} ${
              playerAState.isPlaying && styles["current-timer"]
            }`}
          >
            {formatedTime1}
          </div>
          <div
            className={`${styles["indicator-content"]} ${
              playerBState.isPlaying && styles["current-timer"]
            }`}
          >
            {formatedTime2}
          </div>
        </>
      );
      break;
    case GAME_MODE.RACE:
      mode = <div className={styles["indicator-content"]}>{race}</div>;
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

function convertTimeFiguresToString(time) {
  const minutes = "0" + Math.floor(time / 60);
  const seconds = "0" + (time - minutes * 60);
  return minutes.slice(-2) + " : " + seconds.slice(-2);
}

export default GameModeIndicator;
