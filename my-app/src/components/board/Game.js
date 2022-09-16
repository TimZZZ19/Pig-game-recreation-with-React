import Button from "../reusables/Button";
import Dice from "./Dice";
import PLAYER_ACTIONS from "../../mappings/PLAYER_ACTIONS";
import GAME_STATUS from "../../mappings/GAME_STATUS";

const Game = ({
  playerAState,
  playerADispatch,
  playerBDispatch,
  diceNumber,
  setDiceNumber,
  diceHidden,
  setDiceHidden,
  gameState,
}) => {
  // Helper functions
  const ResetAAndSwitchToB = () => {
    playerADispatch({ type: PLAYER_ACTIONS.RESET_CURRENT_SCORE });
    playerADispatch({ type: PLAYER_ACTIONS.STOP_PLAYING });
    playerBDispatch({ type: PLAYER_ACTIONS.START_PLAYING });
  };
  const ResetBAndSwitchToA = () => {
    playerBDispatch({ type: PLAYER_ACTIONS.RESET_CURRENT_SCORE });
    playerADispatch({ type: PLAYER_ACTIONS.START_PLAYING });
    playerBDispatch({ type: PLAYER_ACTIONS.STOP_PLAYING });
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
          type: PLAYER_ACTIONS.SET_CURRENT_SCORE,
          payload: diceResult,
        });
      }
    } else {
      // if B is playing ...
      if (diceResult === 1) {
        ResetBAndSwitchToA();
      } else {
        playerBDispatch({
          type: PLAYER_ACTIONS.SET_CURRENT_SCORE,
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
      playerADispatch({ type: PLAYER_ACTIONS.SET_ACCUMULATIVE_SCORE });
      ResetAAndSwitchToB();
    } else {
      // if B is active, update score and switch to A.
      playerBDispatch({ type: PLAYER_ACTIONS.SET_ACCUMULATIVE_SCORE });
      ResetBAndSwitchToA();
    }
  };

  return (
    <>
      <Dice diceNumber={diceNumber} hideDice={diceHidden} />
      <Button
        buttonContent={"🎲 Roll"}
        extraStyles={{ width: "11rem", top: "39.3rem" }}
        secondaryClass={
          gameState.gameState !== GAME_STATUS.PLAYING && "btn--unclickable"
        }
        onClick={rollClickHandler}
      />
      <Button
        buttonContent={"📥 Hold"}
        extraStyles={{ width: "11rem", top: "46.1rem" }}
        secondaryClass={
          gameState.gameState !== GAME_STATUS.PLAYING && "btn--unclickable"
        }
        onClick={holdClickHandler}
      />
    </>
  );
};

export default Game;
