import { useState, useReducer } from "react";
import Board from "./components/board/Board";
import GameControl from "./components/game_control/GameControl";
import Player from "./components/board/Player";
import Game from "./components/board/Game";
import styles from "./App.module.css";

const ACTIONS = {
  START_PLAYING: "start palying",
  STOP_PLAYING: "stop playing",
  SET_ACCUMULATIVE_SCORE: "set accumulative score",
  RESET_ACCUMULATIVE_SCORE: "reset accumulative score",
  SET_CURRENT_SCORE: "set current score",
  RESET_CURRENT_SCORE: "reset current score",
};

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
        <Game
          ACTIONS={ACTIONS}
          playerAState={playerAState}
          playerADispatch={playerADispatch}
          playerBDispatch={playerBDispatch}
          diceNumber={diceNumber}
          setDiceNumber={setDiceNumber}
          diceHidden={diceHidden}
          setDiceHidden={setDiceHidden}
        />
      </Board>
      <GameControl
        ACTIONS={ACTIONS}
        playerADispatch={playerADispatch}
        playerBDispatch={playerBDispatch}
        setDiceNumber={setDiceNumber}
        setDiceHidden={setDiceHidden}
      />
    </div>
  );
}

export default App;
