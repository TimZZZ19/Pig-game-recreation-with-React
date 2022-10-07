import { useRef, useEffect } from "react";
import GAME_STATUS from "../../mappings/GAME_STATUS";
import GAME_ACTIONS from "../../mappings/GAME_ACTIONS";
import PLAYER_ACTIONS from "../../mappings/PLAYER_ACTIONS";

const TimeMonitor = (
  gameStatus,
  playerState,
  playerDispatch,
  opponentState,
  opponentDispatch,
  gameDispatch,
  displayWinner
) => {
  const id = useRef();
  const cleanUp = () => clearTimeout(id.current);

  const { SETTING, PAUSED, FROZEN } = GAME_STATUS;

  const { isPlaying, timer, accumulativeScore } = playerState;

  useEffect(() => {
    if ([SETTING, PAUSED, FROZEN].includes(gameStatus) || !isPlaying) {
      return;
    }

    id.current = setTimeout(() => {
      playerDispatch({
        type: PLAYER_ACTIONS.SET_TIME,
        payload: timer - 1,
      });
    }, 1000);
    return () => cleanUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, isPlaying, timer]);

  useEffect(() => {
    if ([SETTING, PAUSED, FROZEN].includes(gameStatus) || timer > 0) return;

    // If timer is up, then we'll see if opponent's timer is also up

    if (opponentState.timer > 0) {
      // if no, switch to opponent's turn
      playerDispatch({ type: PLAYER_ACTIONS.STOP_PLAYING });
      playerDispatch({ type: PLAYER_ACTIONS.RESET_CURRENT_SCORE });
      gameDispatch({ type: GAME_ACTIONS.HIDE_DICE });
      opponentDispatch({ type: PLAYER_ACTIONS.START_PLAYING });
      // also disable the hold button, cause it won't be useful anymore
    } else {
      // if opponent's time is up, then game is over, the current player isn't playing anymore
      playerDispatch({ type: PLAYER_ACTIONS.STOP_PLAYING });

      // if yes, determine winner
      if (accumulativeScore > opponentState.accumulativeScore) {
        playerDispatch({ type: PLAYER_ACTIONS.MARK_AS_WIINER });
      }
      if (accumulativeScore < opponentState.accumulativeScore) {
        opponentDispatch({ type: PLAYER_ACTIONS.MARK_AS_WIINER });
      }

      // Get rid of the dice
      gameDispatch({ type: GAME_ACTIONS.HIDE_DICE });

      // Call modal and display result
      displayWinner();

      cleanUp();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);
};

export default TimeMonitor;
