import { useState, useReducer } from "react";
import Board from "./components/board/Board";
import GameControlDiv from "./components/game_control/GameControlDiv";
import Player from "./components/board/Player";
import Play from "./components/board/Play";
import styles from "./App.module.css";
import ACTIONS from "./mappings/ACTIONS";
import MODE from "./mappings/MODE";
import GameMode from "./components/board/game_mode/GameMode";

const playerAReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_PLAYING:
      return { ...state, isPlaying: true };
    case ACTIONS.STOP_PLAYING:
      return { ...state, isPlaying: false };
    case ACTIONS.SET_ACCUMULATIVE_SCORE:
      return {
        ...state,
        accumulativeScore: state.accumulativeScore + state.currentScore,
      };
    case ACTIONS.RESET_ACCUMULATIVE_SCORE:
      return {
        ...state,
        accumulativeScore: 0,
      };
    case ACTIONS.SET_CURRENT_SCORE:
      return {
        ...state,
        currentScore: state.currentScore + action.payload,
      };
    case ACTIONS.RESET_CURRENT_SCORE:
      return {
        ...state,
        currentScore: 0,
      };
    default:
      throw new Error();
  }
};

const playerAInitialConfigs = {
  name: "Player 1",
  isPlaying: true,
  accumulativeScore: 0,
  currentScore: 0,
};

const playerBReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_PLAYING:
      return { ...state, isPlaying: true };
    case ACTIONS.STOP_PLAYING:
      return { ...state, isPlaying: false };
    case ACTIONS.SET_ACCUMULATIVE_SCORE:
      return {
        ...state,
        accumulativeScore: state.accumulativeScore + state.currentScore,
      };
    case ACTIONS.RESET_ACCUMULATIVE_SCORE:
      return {
        ...state,
        accumulativeScore: 0,
      };
    case ACTIONS.SET_CURRENT_SCORE:
      return {
        ...state,
        currentScore: state.currentScore + action.payload,
      };
    case ACTIONS.RESET_CURRENT_SCORE:
      return {
        ...state,
        currentScore: 0,
      };
    default:
      throw new Error();
  }
};

const playerBInitialConfigs = {
  name: "Player 2",
  isPlaying: false,
  accumulativeScore: 0,
  currentScore: 0,
};

function App() {
  // States
  const [diceNumber, setDiceNumber] = useState(1);
  const [diceHidden, setDiceHidden] = useState(true);
  const [gameMode, setGameMode] = useState(MODE.TIMER);

  const [playerAState, playerADispatch] = useReducer(
    playerAReducer,
    playerAInitialConfigs
  );

  const [playerBState, playerBDispatch] = useReducer(
    playerBReducer,
    playerBInitialConfigs
  );

  return (
    <div className={styles.app}>
      <Board>
        <GameMode gameMode={gameMode} />
        <Player
          player={playerAState.name}
          playerStatus={playerAState.isPlaying}
          playerScore={playerAState.accumulativeScore}
          currScore={playerAState.currentScore}
        />
        <Player
          player={playerBState.name}
          playerStatus={playerBState.isPlaying}
          playerScore={playerBState.accumulativeScore}
          currScore={playerBState.currentScore}
        />
        <Play
          playerAState={playerAState}
          playerADispatch={playerADispatch}
          playerBDispatch={playerBDispatch}
          diceNumber={diceNumber}
          setDiceNumber={setDiceNumber}
          diceHidden={diceHidden}
          setDiceHidden={setDiceHidden}
        />
      </Board>
      <GameControlDiv
        playerADispatch={playerADispatch}
        playerBDispatch={playerBDispatch}
        setDiceNumber={setDiceNumber}
        setDiceHidden={setDiceHidden}
        gameMode={gameMode}
        setGameMode={setGameMode}
      />
    </div>
  );
}

export default App;
