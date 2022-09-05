import styles from "./GameControl.module.css";
import Button from "../reusables/Button";

const GameControl = ({
  ACTIONS,
  playerADispatch,
  playerBDispatch,
  setDiceNumber,
  setDiceHidden,
}) => {
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

  return (
    <div className={styles["game-control"]}>
      <Button
        buttonContent="🔄 New game"
        extraStyles={{ width: "auto", top: "4rem" }}
        onClick={resetGame}
      />
    </div>
  );
};

export default GameControl;
