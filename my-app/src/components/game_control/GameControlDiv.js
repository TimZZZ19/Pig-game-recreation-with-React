import { useState } from "react";
import styles from "./GameControlDiv.module.css";
import ControlPanel from "./ControlPanel";
import Button from "../reusables/Button";
import ACTIONS from "../../mappings/ACTIONS";
import STATUS from "../../mappings/STATUS";

const GameControlDiv = ({
  playerADispatch,
  playerBDispatch,
  setDiceNumber,
  setDiceHidden,
  gameMode,
  setGameMode,
  gameStatus,
  setGameStatus,
}) => {
  const [controlPanelShown, setControlPanelShown] = useState(true);

  // When New Game is clicked on,
  const startGame = () => {
    playerADispatch({ type: ACTIONS.START_PLAYING });
    playerBDispatch({ type: ACTIONS.STOP_PLAYING });
    playerADispatch({ type: ACTIONS.RESET_ACCUMULATIVE_SCORE });
    playerBDispatch({ type: ACTIONS.RESET_ACCUMULATIVE_SCORE });
    playerADispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
    playerBDispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
    setDiceNumber(1);
    setDiceHidden(true);
    setGameStatus(STATUS.START);
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
        startGame={startGame}
        gameMode={gameMode}
        setGameMode={setGameMode}
        gameStatus={gameStatus}
      ></ControlPanel>
    </div>
  );
};

export default GameControlDiv;
