import React from "react";
import styles from "./Unselected.module.css";
import MODE from "../../mappings/MODE";

const Unselected = ({ gameMode }) => {
  return (
    <p
      className={`${styles["unselected-text"]} ${
        gameMode === MODE.WARNING && styles["warning"]
      }`}
    >
      Please choose your game mode
    </p>
  );
};

export default Unselected;
