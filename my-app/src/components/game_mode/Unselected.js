import React from "react";
import styles from "./Unselected.module.css";
import GAME_MODE from "../../mappings/GAME_MODE";

const Unselected = ({ gameState }) => {
  return (
    <p
      className={`${styles["unselected-text"]} ${
        gameState.gameMode === GAME_MODE.WARNING && styles["warning"]
      }`}
    >
      Please choose your game mode
    </p>
  );
};

export default Unselected;
