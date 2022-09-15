import { useState, useReducer } from "react";
import Board from "./components/board/Board";
import GameControlDiv from "./components/game_control/GameControlDiv";
import Player from "./components/board/Player";
import Play from "./components/board/Play";
import styles from "./App.module.css";
import ACTIONS from "./mappings/ACTIONS";
import MODE from "./mappings/MODE";
import GameModeIndicator from "./components/game_mode/GameModeIndicator";
import Modal from "./components/modal/Modal";
import STATUS from "./mappings/STATUS";
import MODAL_ACTIONS from "./mappings/MODAL_ACTIONS";
import MODAL_CONTENT from "./mappings/MODAL_CONTENT";

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

const modalReducer = (state, action) => {
  switch (action.type) {
    case MODAL_ACTIONS.OPEN_MODAL:
      return { ...state, modalOpen: true };
    case MODAL_ACTIONS.CLOSE_MODAL:
      return { ...state, modalOpen: false };
    case MODAL_ACTIONS.CHANGE_TO_COUNTDOWN:
      return { ...state, modalContent: MODAL_CONTENT.COUNT_DOWN };
    case MODAL_ACTIONS.CHANGE_TO_RESULT:
      return { ...state, modalContent: MODAL_CONTENT.RESULT };
    case MODAL_ACTIONS.CHANGE_TO_CONFIRM:
      return { ...state, modalContent: MODAL_CONTENT.CONFIRM };
    case MODAL_ACTIONS.CHANGE_TO_NULL:
      return { ...state, modalContent: MODAL_CONTENT.NULL };
    default:
      throw new Error();
  }
};
const modalInitialConfigs = {
  modalOpen: false,
  modalContent: "",
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

  const [gameStatus, setGameStatus] = useState(STATUS.SETTING);

  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    modalInitialConfigs
  );

  // Function for restarting the game
  const initializeBoard = () => {
    playerADispatch({ type: ACTIONS.START_PLAYING });
    playerBDispatch({ type: ACTIONS.STOP_PLAYING });
    playerADispatch({ type: ACTIONS.RESET_ACCUMULATIVE_SCORE });
    playerBDispatch({ type: ACTIONS.RESET_ACCUMULATIVE_SCORE });
    playerADispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
    playerBDispatch({ type: ACTIONS.RESET_CURRENT_SCORE });
    setDiceNumber(1);
    setDiceHidden(true);
  };

  return (
    <div className={styles.app}>
      <GameModeIndicator gameMode={gameMode} />
      <Modal
        modalState={modalState}
        modalDispatch={modalDispatch}
        setGameStatus={setGameStatus}
        initializeBoard={initializeBoard}
      />
      <Board gameStatus={gameStatus}>
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
          gameStatus={gameStatus}
        />
      </Board>
      <GameControlDiv
        gameMode={gameMode}
        setGameMode={setGameMode}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        modalDispatch={modalDispatch}
      />
    </div>
  );
}

export default App;
