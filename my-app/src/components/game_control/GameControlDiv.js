import { useState } from "react";
import styles from "./GameControlDiv.module.css";
import ControlPanel from "./ControlPanel";
import Button from "../reusables/Button";
import ACTIONS from "../../mappings/ACTIONS";
import STATUS from "../../mappings/STATUS";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";

const GameControlDiv = ({
  playerADispatch,
  playerBDispatch,
  setDiceNumber,
  setDiceHidden,
  gameMode,
  setGameMode,
  gameStatus,
  setGameStatus,
  modalDispatch,
}) => {
  const [controlPanelShown, setControlPanelShown] = useState(true);

  const initializeInterface = () => {
    // Initialize interface and activate the board
    playerADispatch({ type: ACTIONS.START_PLAYING });
    playerBDispatch({ type: ACTIONS.STOP_PLAYING });
    playerADispatch({ type: ACTIONS.RESET_ACCUMULATIVE_SCORE });
    playerBDispatch({ type: ACTIONS.RESET_ACCUMULATIVE_SCORE });
    playerADispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
    playerBDispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
    setDiceNumber(1);
    setDiceHidden(true);

    // Activate the board
    setGameStatus(STATUS.PLAYING);
  };

  // When New Game is clicked on,
  const startGame = () => {
    // Start counting down
    modalDispatch({ type: MODAL_ACTIONS.OPEN_MODAL });
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_COUNTDOWN });

    setTimeout(() => {
      initializeInterface();
    }, 6000);
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
