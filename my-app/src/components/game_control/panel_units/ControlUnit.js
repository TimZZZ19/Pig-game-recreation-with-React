import React from "react";
import styles from "./ControlUnit.module.css";
import Button from "../../reusables/Button";
import UnitTitle from "../../reusables/UnitTitle";
import STATUS from "../../../mappings/STATUS";

const ControlUnit = ({ startGame, gameStatus }) => {
  return (
    <div className={styles["control-unit"]}>
      <UnitTitle title={"game control"} />
      <Button
        buttonContent="▶️ Start"
        extraStyles={{ width: "16rem", top: "4rem" }}
        secondaryClass={gameStatus === STATUS.PLAYING && "btn--unclickable"}
        onClick={startGame}
      />
      <Button
        buttonContent="⏸️ Pause"
        extraStyles={{ width: "16rem", top: "9rem" }}
        secondaryClass={gameStatus !== STATUS.PLAYING && "btn--unclickable"}
        onClick={startGame}
      />
      <Button
        buttonContent="🔄 Restart"
        extraStyles={{ width: "16rem", top: "14rem" }}
        secondaryClass={gameStatus !== STATUS.PAUSED && "btn--unclickable"}
        onClick={startGame}
      />
    </div>
  );
};

export default ControlUnit;
