import Button from "../reusables/Button";
import Dice from "./Dice";
import TimeMonitor from "../game_mode/TimeMonitor";
import RaceMonitor from "../game_mode/RaceMonitor";

import PLAYER_ACTIONS from "../../mappings/PLAYER_ACTIONS";
import GAME_STATUS from "../../mappings/GAME_STATUS";
import GAME_ACTIONS from "../../mappings/GAME_ACTIONS";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";
import GAME_MODE from "../../mappings/GAME_MODE";
import SWITCH_DIRECTION from "../../mappings/SWITCH_DIRECTION";

const Game = ({
  playerAState,
  playerBState,
  playerADispatch,
  playerBDispatch,
  gameState,
  gameDispatch,
  modalDispatch,
}) => {
  const { gameStatus, gameMode, race, diceNumber, diceHidden } = gameState;

  const { PLAYING, PAUSED, FROZEN } = GAME_STATUS;

  const { UNSELECTED, WARNING, TIMER, RACE } = GAME_MODE;

  // Select winner checker based upon game mode
  switch (gameMode) {
    case UNSELECTED:
    case WARNING:
      break;
    case TIMER:
      // Initiate the timer monitor
      TimeMonitor(
        gameStatus,
        playerAState,
        playerADispatch,
        playerBState,
        playerBDispatch,
        gameDispatch,
        displayWinner
      );
      TimeMonitor(
        gameStatus,
        playerBState,
        playerBDispatch,
        playerAState,
        playerADispatch,
        gameDispatch,
        displayWinner
      );
      break;
    case RACE:
      // Initiate the race monitor
      RaceMonitor(
        race,
        playerAState.accumulativeScore,
        playerADispatch,
        playerBDispatch,
        displayWinner
      );
      RaceMonitor(
        race,
        playerBState.accumulativeScore,
        playerBDispatch,
        playerADispatch,
        displayWinner
      );
      break;
    default:
      throw new Error();
  }

  // When Roll is clicked on,
  const handleRoll = () => {
    // 1. Roll the dice
    const diceResult = rollDice(1, 6);

    // 2. Reveal dice and show the related image
    showDice(diceResult);

    //3. hanlde the dice result: either switch side or update current score
    handleDiceResult(diceResult);

    function rollDice(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function showDice() {
      gameDispatch({ type: GAME_ACTIONS.UNHIDE_DICE });
      gameDispatch({ type: GAME_ACTIONS.SET_DICE_NUMBER, payload: diceResult });
    }

    function handleDiceResult(result) {
      if (playerAState.isPlaying) {
        // if A is playing ...
        if (result === 1) {
          // Reset current score and switch turn
          playerADispatch({ type: PLAYER_ACTIONS.RESET_CURRENT_SCORE });
          switchSide(SWITCH_DIRECTION.ATOB);
        } else {
          playerADispatch({
            type: PLAYER_ACTIONS.UPDATE_CURRENT_SCORE,
            payload: result,
          });
        }
      }

      if (playerBState.isPlaying) {
        // if B is playing ...
        if (result === 1) {
          playerBDispatch({ type: PLAYER_ACTIONS.RESET_CURRENT_SCORE });
          switchSide(SWITCH_DIRECTION.BTOA);
        } else {
          playerBDispatch({
            type: PLAYER_ACTIONS.UPDATE_CURRENT_SCORE,
            payload: result,
          });
        }
      }
    }
  };

  // When Hold is clicked on,
  const handleHold = () => {
    gameDispatch({ type: GAME_ACTIONS.HIDE_DICE });

    // if A is active, update score and switch to B.
    if (playerAState.isPlaying) {
      playerADispatch({ type: PLAYER_ACTIONS.UPDATE_ACCUMULATIVE_SCORE });
      playerADispatch({ type: PLAYER_ACTIONS.RESET_CURRENT_SCORE });
      switchSide(SWITCH_DIRECTION.ATOB);
    }

    // if B is active, update score and switch to A.
    if (playerBState.isPlaying) {
      playerBDispatch({ type: PLAYER_ACTIONS.UPDATE_ACCUMULATIVE_SCORE });
      playerBDispatch({ type: PLAYER_ACTIONS.RESET_CURRENT_SCORE });
      switchSide(SWITCH_DIRECTION.BTOA);
    }
  };

  return (
    <>
      <Dice diceNumber={diceNumber} hideDice={diceHidden} />
      <Button
        buttonContent={"🎲 Roll"}
        extraStyles={{ width: "11rem", top: "39.3rem" }}
        secondaryClass={gameStatus !== PLAYING && "btn--unclickable"}
        onClick={handleRoll}
      />
      <Button
        buttonContent={"📥 Hold"}
        extraStyles={{ width: "11rem", top: "46.1rem" }}
        secondaryClass={gameStatus !== PLAYING && "btn--unclickable"}
        onClick={handleHold}
      />
    </>
  );

  // Helper functions
  function switchSide(direction) {
    switch (direction) {
      case SWITCH_DIRECTION.ATOB:
        playerADispatch({ type: PLAYER_ACTIONS.STOP_PLAYING });
        playerBDispatch({ type: PLAYER_ACTIONS.START_PLAYING });
        break;
      case SWITCH_DIRECTION.BTOA:
        playerADispatch({ type: PLAYER_ACTIONS.START_PLAYING });
        playerBDispatch({ type: PLAYER_ACTIONS.STOP_PLAYING });
        break;
      default:
        throw new Error();
    }
  }
  function displayWinner() {
    // open modal and change to the result page
    modalDispatch({ type: MODAL_ACTIONS.OPEN_MODAL });
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_RESULT });

    // set the game status to fronzen, so the control panel is frozen
    gameDispatch({
      type: GAME_ACTIONS.CHANGE_GAME_STATUS,
      payload: FROZEN,
    });
  }
};

export default Game;
