import { useRef, useEffect } from "react";
import Button from "../reusables/Button";
import Dice from "./Dice";
import PLAYER_ACTIONS from "../../mappings/PLAYER_ACTIONS";
import GAME_STATUS from "../../mappings/GAME_STATUS";
import GAME_ACTIONS from "../../mappings/GAME_ACTIONS";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";
import GAME_MODE from "../../mappings/GAME_MODE";

const GameTicking = (
  timer,
  gameStatus,
  gameDispatch,
  displayWinner,
  playerAState,
  playerBState,
  playerADispatch,
  playerBDispatch
) => {
  const id = useRef();
  const cleanUp = () => clearTimeout(id.current);

  useEffect(() => {
    if (gameStatus === GAME_STATUS.PAUSED) return;
    id.current = setTimeout(() => {
      gameDispatch({
        type: GAME_ACTIONS.SET_TIMER_TIME,
        payload: timer - 1,
      });
    }, 1000);
    return () => cleanUp();
  }, [timer, gameStatus, gameDispatch]);

  useEffect(() => {
    if (timer > 0) return;
    // Time is up, determine the winner

    // A is the winner
    if (playerAState.accumulativeScore > playerBState.accumulativeScore) {
      playerADispatch({ type: PLAYER_ACTIONS.MARK_AS_WIINER });
    }

    // B is the winner
    if (playerAState.accumulativeScore < playerBState.accumulativeScore) {
      playerBDispatch({ type: PLAYER_ACTIONS.MARK_AS_WIINER });
    }

    // Get rid of the dice
    gameDispatch({ type: GAME_ACTIONS.HIDE_DICE });

    // Call modal and display result
    displayWinner();
    cleanUp();
  }, [
    timer,
    gameDispatch,
    displayWinner,
    playerAState,
    playerBState,
    playerADispatch,
    playerBDispatch,
  ]);
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
    gameDispatch({ type: GAME_ACTIONS.UNHIDE_DICE });

    // 2. Update the displayed dice image according to this result.
    gameDispatch({ type: GAME_ACTIONS.SET_DICE_NUMBER, payload: diceResult });

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
    }

    if (playerBState.isPlaying) {
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

  // For the timer mode
  if (gameMode === GAME_MODE.TIMER && [PLAYING, PAUSED].includes(gameStatus)) {
    GameTicking(
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
  const rollClickHandler = () => {
    const rollDice = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const diceResult = rollDice(1, 6);
    handleDiceResult(diceResult);
  };

  // When Hold is clicked on,
  const holdClickHandler = () => {
    gameDispatch({ type: GAME_ACTIONS.HIDE_DICE });
    if (playerAState.isPlaying) {
      // if A is active, update score and switch to B.
      const currentPlayerATotalScore =
        playerAState.accumulativeScore + playerAState.currentScore;
      if (gameMode === GAME_MODE.RACE && currentPlayerATotalScore >= race) {
        playerADispatch({ type: PLAYER_ACTIONS.MARK_AS_WIINER });
        displayWinner();
      }
      playerADispatch({
        type: PLAYER_ACTIONS.SET_ACCUMULATIVE_SCORE,
        payload: currentPlayerATotalScore,
      });
      ResetAAndSwitchToB();
    }

    if (playerBState.isPlaying) {
      // if B is active, update score and switch to A.
      const currentPlayerBTotalScore =
        playerBState.accumulativeScore + playerBState.currentScore;
      if (gameMode === GAME_MODE.RACE && currentPlayerBTotalScore >= race) {
        playerBDispatch({ type: PLAYER_ACTIONS.MARK_AS_WIINER });
        displayWinner();
      }
      playerBDispatch({
        type: PLAYER_ACTIONS.SET_ACCUMULATIVE_SCORE,
        payload: currentPlayerBTotalScore,
      });
      ResetBAndSwitchToA();
    }
  };

  return (
    <>
      <Dice diceNumber={diceNumber} hideDice={diceHidden} />
      <Button
        buttonContent={"🎲 Roll"}
        extraStyles={{ width: "11rem", top: "39.3rem" }}
        secondaryClass={gameStatus !== PLAYING && "btn--unclickable"}
        onClick={rollClickHandler}
      />
      <Button
        buttonContent={"📥 Hold"}
        extraStyles={{ width: "11rem", top: "46.1rem" }}
        secondaryClass={gameStatus !== PLAYING && "btn--unclickable"}
        onClick={holdClickHandler}
      />
    </>
  );
};

export default Game;
