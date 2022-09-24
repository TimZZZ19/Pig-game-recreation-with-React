import { useRef, useEffect } from "react";
import GAME_STATUS from "../../mappings/GAME_STATUS";
import GAME_ACTIONS from "../../mappings/GAME_ACTIONS";
import PLAYER_ACTIONS from "../../mappings/PLAYER_ACTIONS";

const TimeMonitor = (
  gameStatus,
  playerAState,
  playerBState,
  playerADispatch,
  playerBDispatch,
  displayWinner
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

export default TimeMonitor;
