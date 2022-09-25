import { useEffect } from "react";

import PLAYER_ACTIONS from "../../mappings/PLAYER_ACTIONS";

const RaceMonitor = (
  finishLine,
  accumulativeScore,
  playerDispatch,
  opponentDispatch,
  displayWinner
) => {
  useEffect(() => {
    if (accumulativeScore < finishLine) return;
    playerDispatch({ type: PLAYER_ACTIONS.MARK_AS_WIINER });
    opponentDispatch({ type: PLAYER_ACTIONS.STOP_PLAYING });
    displayWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accumulativeScore]);
};

export default RaceMonitor;
