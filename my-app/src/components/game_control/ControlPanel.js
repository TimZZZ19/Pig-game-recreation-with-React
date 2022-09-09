import React from "react";
import styles from "./ControlPanel.module.css";
import Button from "../reusables/Button";
import ModeUnit from "./panel_units/ModeUnit";
import ControlUnit from "./panel_units/ControlUnit";

const ControlPanel = ({
  controlPanelShown,
  handleExpandButton,
  resetGame,
  gameMode,
  setGameMode,
}) => {
  return (
    <div
      className={`${styles["control-panel"]} ${
        controlPanelShown && styles["control-panel--show"]
      }`}
    >
      <h2 className={`${styles["game-status-text"]}`}>🟢 ongoing</h2>
      <Button
        buttonContent="⏩"
        extraStyles={{ width: "4.2rem", top: "2rem", left: "80%" }}
        onClick={handleExpandButton}
      />
      <ModeUnit gameMode={gameMode} setGameMode={setGameMode} />
      <ControlUnit resetGame={resetGame} />
    </div>
  );
};

export default ControlPanel;
