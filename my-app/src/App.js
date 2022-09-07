import { useState, useReducer } from "react";
import Board from "./components/board/Board";
import GameControl from "./components/game_control/GameControl";
import Player from "./components/board/Player";
import Play from "./components/board/Play";
import styles from "./App.module.css";
import Timer from "./components/board/game_mode/Timer";
import FinishLine from "./components/board/game_mode/FinishLine";
import ACTIONS from "./mappings/ACTIONS";
import MODE from "./mappings/MODE";

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

  let gameModeContent;
  switch (gameMode) {
    case MODE.TIMER:
      gameModeContent = <Timer />;
      break;
    case MODE.FINISH_lINE:
      gameModeContent = <FinishLine />;
      break;
    default:
      throw new Error();
  }

  return (
    <div className={styles.app}>
      <Board>
        <Player
          player={playerAState.name}
          playerStatus={playerAState.isPlaying}
          playerScore={playerAState.accumulativeScore}
          currScore={playerAState.currentScore}
        />
        {gameModeContent}
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
      <GameControl
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
