import Button from "../reusables/Button";
import Dice from "./Dice";
import ACTIONS from "../../mappings/ACTIONS";

const Play = ({
  playerAState,
  playerADispatch,
  playerBDispatch,
  diceNumber,
  setDiceNumber,
  diceHidden,
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
      <Dice diceNumber={diceNumber} hideDice={diceHidden} />
      <Button
        buttonContent={"🎲 Roll"}
        extraStyles={{ width: "11rem", top: "39.3rem" }}
        onClick={rollClickHandler}
      />
      <Button
        buttonContent={"📥 Hold"}
        extraStyles={{ width: "11rem", top: "46.1rem" }}
        onClick={holdClickHandler}
      />
    </>
  );
};

export default Play;
