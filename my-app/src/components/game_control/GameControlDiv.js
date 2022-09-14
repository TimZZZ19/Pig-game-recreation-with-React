import { useState } from "react";
import styles from "./GameControlDiv.module.css";
import ControlPanel from "./ControlPanel";
import Button from "../reusables/Button";
import ACTIONS from "../../mappings/ACTIONS";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";
import COUNT_DOWN from "../../mappings/COUNT_DOWN";

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
  const handleExpandButton = () => setControlPanelShown((curr) => !curr);

  const [controlPanelShown, setControlPanelShown] = useState(true);

  const countDown = () => {
    // Open modal and start counting down
    modalDispatch({ type: MODAL_ACTIONS.OPEN_MODAL });
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_COUNTDOWN });

    // Reset modal content to null and close modal
    setTimeout(() => {
      modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_NULL });
      modalDispatch({ type: MODAL_ACTIONS.CLOSE_MODAL });
    }, (COUNT_DOWN.TIME + 1) * 1000);
  };

  const initializeBoard = () =>
    setTimeout(() => {
      // Initialize the board
      playerADispatch({ type: ACTIONS.START_PLAYING });
      playerBDispatch({ type: ACTIONS.STOP_PLAYING });
      playerADispatch({ type: ACTIONS.RESET_ACCUMULATIVE_SCORE });
      playerBDispatch({ type: ACTIONS.RESET_ACCUMULATIVE_SCORE });
      playerADispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
      playerBDispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
      setDiceNumber(1);
      setDiceHidden(true);
    }, (COUNT_DOWN.TIME + 1) * 1000);

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
        countDown={countDown}
        initializeBoard={initializeBoard}
        gameMode={gameMode}
        setGameMode={setGameMode}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
      />
    </div>
  );
};

export default GameControlDiv;
