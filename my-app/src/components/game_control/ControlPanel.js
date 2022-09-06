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
      <Button
        buttonContent="🔄 restart"
        extraStyles={{ width: "16rem", top: "8rem" }}
        onClick={resetGame}
      />
    </div>
  );
};

export default ControlPanel;
