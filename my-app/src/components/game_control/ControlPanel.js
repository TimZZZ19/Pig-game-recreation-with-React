import React from "react";
import styles from "./ControlPanel.module.css";
import Button from "../reusables/Button";

const ControlPanel = ({ controlPanelShown, handleExpandButton, resetGame }) => {
  return (
    <div
      className={`${styles["control-panel"]} ${
        controlPanelShown && styles["control-panel--show"]
      }`}
    >
      <Button
        buttonContent="▶️"
        extraStyles={{ width: "4.2rem", top: "2rem", left: "80%" }}
        onClick={handleExpandButton}
      />

      <h1 className={styles["game-mode-text"]}>game mode</h1>
      <Button
        buttonContent="⏲ Timer"
        extraStyles={{ width: "16rem", top: "11rem" }}
      />
      <Button
        buttonContent="🏃‍♂️ Finish line"
        extraStyles={{ width: "16rem", top: "16rem" }}
      />
      <Button
        buttonContent="🔄 new game"
        extraStyles={{ width: "16rem", top: "23rem" }}
        onClick={resetGame}
      />
    </div>
  );
};

export default ControlPanel;
