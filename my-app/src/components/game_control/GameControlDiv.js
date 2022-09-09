import { useState } from "react";
import styles from "./GameControlDiv.module.css";
import ControlPanel from "./ControlPanel";
import Button from "../reusables/Button";
import ACTIONS from "../../mappings/ACTIONS";

const GameControlDiv = ({
  playerADispatch,
  playerBDispatch,
  setDiceNumber,
  setDiceHidden,
  gameMode,
  setGameMode,
}) => {
  const [controlPanelShown, setControlPanelShown] = useState(false);

  // When New Game is clicked on,
  const resetGame = () => {
    playerADispatch({ type: ACTIONS.START_PLAYING });
    playerBDispatch({ type: ACTIONS.STOP_PLAYING });
    playerADispatch({ type: ACTIONS.RESET_ACCUMULATIVE_SCORE });
    playerBDispatch({ type: ACTIONS.RESET_ACCUMULATIVE_SCORE });
    playerADispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
    playerBDispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
    setDiceNumber(1);
    setDiceHidden(true);
  };

  const handleExpandButton = () => {
    setControlPanelShown((curr) => !curr);
  };

  return (
    <div className={styles["game-control"]}>
      <Button
        buttonContent="⏪"
        extraStyles={{ width: "4.2rem", top: "2rem", left: "80%" }}
        onClick={handleExpandButton}
      />
      <ControlPanel
        controlPanelShown={controlPanelShown}
        handleExpandButton={handleExpandButton}
        resetGame={resetGame}
        gameMode={gameMode}
        setGameMode={setGameMode}
      ></ControlPanel>
    </div>
  );
};

export default GameControlDiv;
