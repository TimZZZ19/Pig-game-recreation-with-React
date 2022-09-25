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
  }, [gameStatus, isPlaying, timer]);

  useEffect(() => {
    if ([SETTING, PAUSED, FROZEN].includes(gameStatus) || timer > 0) return;

    // If timer is up, then we'll see if opponent's timer is also up

    if (opponentState.timer > 0) {
      console.log("displayWInner");
      // if no, switch to opponent's turn
      playerDispatch({ type: PLAYER_ACTIONS.STOP_PLAYING });
      opponentDispatch({ type: PLAYER_ACTIONS.START_PLAYING });
    } else {
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
  }, [timer]);
};

export default TimeMonitor;
