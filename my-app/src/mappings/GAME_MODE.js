const GAME_MODE = {
  UNSELECTED: "unselected",
  WARNING: "warning",
  TIMER: "timer",
  RACE: "race",
};

export default GAME_MODE;

// let isInRaceMode = gameMode === GAME_MODE.RACE;
// let isInTimerMode = gameMode === GAME_MODE.TIMER;

// if (isInRaceMode) {
//   // make a checker or a monitor using useEffect
//   // call race mode checker
// }

// // For the timer mode
// if (isInTimerMode && [PLAYING, PAUSED].includes(gameStatus)) {
//   TimeMonitor(
//     timer,
//     gameStatus,
//     gameDispatch,
//     displayWinner,
//     playerAState,
//     playerBState,
//     playerADispatch,
//     playerBDispatch
//   );
// }

// const updateAccumulativeScore = (
//   turnScore,
//   isInRaceMode,
//   playerWins,
//   playerDispatch
// ) => {
//   if (isInRaceMode && playerWins) {
//     playerDispatch({ type: PLAYER_ACTIONS.MARK_AS_WIINER });
//     displayWinner();
//   }
//   playerDispatch({
//     type: PLAYER_ACTIONS.UPDATE_ACCUMULATIVE_SCORE,
//     payload: turnScore,
//   });
// };
