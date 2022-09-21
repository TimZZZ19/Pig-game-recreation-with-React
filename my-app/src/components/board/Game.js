import Button from "../reusables/Button";
import Dice from "./Dice";
import TimeMonitor from "./TimeMonitor";

import PLAYER_ACTIONS from "../../mappings/PLAYER_ACTIONS";
import GAME_STATUS from "../../mappings/GAME_STATUS";
import GAME_ACTIONS from "../../mappings/GAME_ACTIONS";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";
import GAME_MODE from "../../mappings/GAME_MODE";

const SWITCH_DIRECTION = {
  ATOB: "switch from A to B",
  BTOA: "switch from B to A",
};

const Game = ({
  playerAState,
  playerBState,
  playerADispatch,
  playerBDispatch,
  gameState,
  gameDispatch,
  modalDispatch,
}) => {
  const { gameStatus, gameMode, timer, race, diceNumber, diceHidden } =
    gameState;

  const { PLAYING, PAUSED, FROZEN } = GAME_STATUS;

  let isInRaceMode = gameMode === GAME_MODE.RACE;
  let isInTimerMode = gameMode === GAME_MODE.TIMER;

  // Helper functions
  const switchSide = (direction) => {
    switch (direction) {
      case SWITCH_DIRECTION.ATOB:
        playerADispatch({ type: PLAYER_ACTIONS.RESET_CURRENT_SCORE });
        playerADispatch({ type: PLAYER_ACTIONS.STOP_PLAYING });
        playerBDispatch({ type: PLAYER_ACTIONS.START_PLAYING });
        break;
      case SWITCH_DIRECTION.BTOA:
        playerBDispatch({ type: PLAYER_ACTIONS.RESET_CURRENT_SCORE });
        playerADispatch({ type: PLAYER_ACTIONS.START_PLAYING });
        playerBDispatch({ type: PLAYER_ACTIONS.STOP_PLAYING });
        break;
      default:
        throw new Error();
    }
  };
  const displayWinner = () => {
    // open modal and change to the result page
    modalDispatch({ type: MODAL_ACTIONS.OPEN_MODAL });
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_RESULT });

    // set the game status to fronzen, so the control panel is frozen
    gameDispatch({
      type: GAME_ACTIONS.CHANGE_GAME_STATUS,
      payload: FROZEN,
    });
  };
  const updateAccumulativeScore = (
    turnScore,
    isInRaceMode,
    playerWins,
    playerDispatch
  ) => {
    if (isInRaceMode && playerWins) {
      playerDispatch({ type: PLAYER_ACTIONS.MARK_AS_WIINER });
      displayWinner();
    }
    playerDispatch({
      type: PLAYER_ACTIONS.SET_ACCUMULATIVE_SCORE,
      payload: turnScore,
    });
  };

  // For the timer mode
  if (isInTimerMode && [PLAYING, PAUSED].includes(gameStatus)) {
    TimeMonitor(
      timer,
      gameStatus,
      gameDispatch,
      displayWinner,
      playerAState,
      playerBState,
      playerADispatch,
      playerBDispatch
    );
  }

  // When Roll is clicked on,
  const handleRoll = () => {
    const rollDice = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const handleDiceResult = (diceResult) => {
      // 1. Reveal dice
      gameDispatch({ type: GAME_ACTIONS.UNHIDE_DICE });

      // 2. Update the displayed dice image according to this result.
      gameDispatch({ type: GAME_ACTIONS.SET_DICE_NUMBER, payload: diceResult });

      // 3. Update the displayed current score.

      if (playerAState.isPlaying) {
        // if A is playing ...
        if (diceResult === 1) {
          // Reset current score and switch turn
          switchSide(SWITCH_DIRECTION.ATOB);
        } else {
          playerADispatch({
            type: PLAYER_ACTIONS.SET_CURRENT_SCORE,
            payload: diceResult,
          });
        }
      }

      if (playerBState.isPlaying) {
        // if B is playing ...
        if (diceResult === 1) {
          switchSide(SWITCH_DIRECTION.BTOA);
        } else {
          playerBDispatch({
            type: PLAYER_ACTIONS.SET_CURRENT_SCORE,
            payload: diceResult,
          });
        }
      }
    };

    handleDiceResult(rollDice(1, 6));
  };

  // When Hold is clicked on,
  const settleTurn = () => {
    gameDispatch({ type: GAME_ACTIONS.HIDE_DICE });

    // if A is active, update score and switch to B.
    if (playerAState.isPlaying) {
      const playerATurnScore =
        playerAState.accumulativeScore + playerAState.currentScore;

      const playerAWins = playerATurnScore >= race;

      updateAccumulativeScore(
        playerATurnScore,
        isInRaceMode,
        playerAWins,
        playerADispatch
      );

      if (isInRaceMode && playerAWins) return;

      switchSide(SWITCH_DIRECTION.ATOB);
    }

    // if B is active, update score and switch to A.
    if (playerBState.isPlaying) {
      const playerBTurnScore =
        playerBState.accumulativeScore + playerBState.currentScore;

      const playerBWins = playerBTurnScore >= race;

      updateAccumulativeScore(
        playerBTurnScore,
        isInRaceMode,
        playerBWins,
        playerBDispatch
      );

      if (isInRaceMode && playerBWins) return;

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
        onClick={settleTurn}
      />
    </>
  );
};

export default Game;
