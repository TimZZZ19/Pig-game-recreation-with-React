import React from "react";
import styles from "./ModeUnit.module.css";
import Button from "../../reusables/Button";
import GAME_MODE from "../../../mappings/GAME_MODE";
import UnitTitle from "../../reusables/UnitTitle";
import GAME_STATUS from "../../../mappings/GAME_STATUS";

const ModeUnit = ({ gameMode, gameState, openTimePicker, openRacePicker }) => {
  return (
    <div className={styles["mode-unit"]}>
      <UnitTitle title={"game mode"} />
      <Button
        buttonContent="⏲ Timer"
        extraStyles={{ width: "16rem", top: "4rem" }}
        secondaryClass={gameMode === GAME_MODE.TIMER && "btn--selected"}
        tertiaryClass={
          gameState.gameStatus !== GAME_STATUS.SETTING && "btn--unclickable"
        }
        onClick={openTimePicker}
      />
      <Button
        buttonContent="🏃‍♂️ Race"
        extraStyles={{ width: "16rem", top: "9rem" }}
        secondaryClass={gameMode === GAME_MODE.RACE && "btn--selected"}
        tertiaryClass={
          gameState.gameStatus !== GAME_STATUS.SETTING && "btn--unclickable"
        }
        onClick={openRacePicker}
      />
    </div>
  );
};

export default ModeUnit;
