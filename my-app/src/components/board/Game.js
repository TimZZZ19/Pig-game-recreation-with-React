import Button from "../reusables/Button";
import Dice from "./Dice";

const Game = ({
  ACTIONS,
  playerAState,
  playerADispatch,
  playerBDispatch,
  diceNumber,
  diceHidden,
  setDiceNumber,
  setDiceHidden,
}) => {
  // Helper functions
  const ResetAAndSwitchToB = () => {
    playerADispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
    playerADispatch({ type: ACTIONS.STOP_PLAYING });
    playerBDispatch({ type: ACTIONS.START_PLAYING });
  };
  const ResetBAndSwitchToA = () => {
    playerBDispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
    playerADispatch({ type: ACTIONS.START_PLAYING });
    playerBDispatch({ type: ACTIONS.STOP_PLAYING });
  };
  const handleDiceResult = (diceResult) => {
    // 1. Reveal dice
    setDiceHidden(false);

    // 2. Update the displayed dice image according to this result.
    setDiceNumber(diceResult);

    // 3. Update the displayed current score.

    if (playerAState.isPlaying) {
      // if A is playing ...
      if (diceResult === 1) {
        // Reset current score and switch turn
        ResetAAndSwitchToB();
      } else {
        playerADispatch({
          type: ACTIONS.SET_CURRENT_SCORE,
          payload: diceResult,
        });
      }
    } else {
      // if B is playing ...
      if (diceResult === 1) {
        ResetBAndSwitchToA();
      } else {
        playerBDispatch({
          type: ACTIONS.SET_CURRENT_SCORE,
          payload: diceResult,
        });
      }
    }
  };

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

  // When Roll is clicked on,
  const rollClickHandler = () => {
    const rollDice = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const diceResult = rollDice(1, 6);
    handleDiceResult(diceResult);
  };

  // When Hold is clicked on,
  const holdClickHandler = () => {
    setDiceHidden(true);
    if (playerAState.isPlaying) {
      // if A is active, update score and switch to B.
      playerADispatch({ type: ACTIONS.SET_ACCUMULATIVE_SCORE });
      ResetAAndSwitchToB();
    } else {
      // if B is active, update score and switch to A.
      playerBDispatch({ type: ACTIONS.SET_ACCUMULATIVE_SCORE });
      ResetBAndSwitchToA();
    }
  };

  return (
    <>
      <Button
        buttonContent="🔄 New game"
        extraStyles={{ width: "auto", top: "4rem" }}
        onClick={resetGame}
      />
      <Dice diceNumber={diceNumber} hideDice={diceHidden} />
      <Button
        buttonContent={"🎲 Roll"}
        extraStyles={{ width: "15rem", top: "39.3rem" }}
        onClick={rollClickHandler}
      />
      <Button
        buttonContent={"📥 Hold"}
        extraStyles={{ width: "15rem", top: "46.1rem" }}
        onClick={holdClickHandler}
      />
    </>
  );
};

export default Game;
