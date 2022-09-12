import React from "react";
import styles from "./ModeUnit.module.css";
import Button from "../../reusables/Button";
import MODE from "../../../mappings/MODE";
import UnitTitle from "../../reusables/UnitTitle";
import STATUS from "../../../mappings/STATUS";

const ModeUnit = ({ gameMode, setGameMode, gameStatus }) => {
  return (
    <div className={styles["mode-unit"]}>
      <UnitTitle title={"game mode"} />
      <Button
        buttonContent="⏲ Timer"
        extraStyles={{ width: "16rem", top: "4rem" }}
        secondaryClass={gameMode === MODE.TIMER && "btn--selected"}
        tertiaryClass={gameStatus !== STATUS.SETTING && "btn--unclickable"}
        onClick={() => setGameMode(MODE.TIMER)}
      />
      <Button
        buttonContent="🏃‍♂️ Finish line"
        extraStyles={{ width: "16rem", top: "9rem" }}
        secondaryClass={gameMode === MODE.FINISH_lINE && "btn--selected"}
        tertiaryClass={gameStatus !== STATUS.SETTING && "btn--unclickable"}
        onClick={() => setGameMode(MODE.FINISH_lINE)}
      />
    </div>
  );
};

export default ModeUnit;
