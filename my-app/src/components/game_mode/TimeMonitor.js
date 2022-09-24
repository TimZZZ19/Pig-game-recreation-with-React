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
  displayWinner
) => {
  const id = useRef();
  const cleanUp = () => clearTimeout(id.current);

  const { SETTING, PAUSED, FROZEN } = GAME_STATUS;

  useEffect(() => {
    if (
      [SETTING, PAUSED, FROZEN].includes(gameStatus) ||
      !playerState.isPlaying
    ) {
      return;
    }

    console.log("am I running?");

    id.current = setTimeout(() => {
      playerDispatch({
        type: PLAYER_ACTIONS.SET_TIME,
        payload: playerState.timer.time - 1,
      });
    }, 1000);
    return () => cleanUp();
  }, [gameStatus, playerState.isPlaying, playerState.timer.time]);

  // useEffect(() => {
  //   if (timer > 0) return;
  //   // Time is up, determine the winner

  //   // A is the winner
  //   if (playerState.accumulativeScore > opponentState.accumulativeScore) {
  //     playerDispatch({ type: PLAYER_ACTIONS.MARK_AS_WIINER });
  //   }

  //   // B is the winner
  //   if (playerState.accumulativeScore < opponentState.accumulativeScore) {
  //     opponentDispatch({ type: PLAYER_ACTIONS.MARK_AS_WIINER });
  //   }

  //   // Get rid of the dice
  //   gameDispatch({ type: GAME_ACTIONS.HIDE_DICE });

  //   // Call modal and display result
  //   displayWinner();
  //   cleanUp();
  // }, [
  //   timer,
  //   gameDispatch,
  //   displayWinner,
  //   playerState,
  //   opponentState,
  //   playerDispatch,
  //   opponentDispatch,
  // ]);
};

export default TimeMonitor;
