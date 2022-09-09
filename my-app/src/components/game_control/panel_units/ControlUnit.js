import React from "react";
import styles from "./ControlUnit.module.css";
import Button from "../../reusables/Button";
import UnitTitle from "../../reusables/UnitTitle";

const ControlUnit = ({ resetGame }) => {
  return (
    <div className={styles["control-unit"]}>
      <UnitTitle title={"game control"} />
      <Button
        buttonContent="▶️ Start"
        extraStyles={{ width: "16rem", top: "4rem" }}
        onClick={resetGame}
      />
      <Button
        buttonContent="⏸️ Pause"
        extraStyles={{ width: "16rem", top: "9rem" }}
        onClick={resetGame}
      />
      <Button
        buttonContent="🔄 Restart"
        extraStyles={{ width: "16rem", top: "14rem" }}
        onClick={resetGame}
      />
    </div>
  );
};

export default ControlUnit;
