import { useReducer, useState } from "react";

//components
import GameRulesDiv from "./components/game_rules/GameRulesDiv";
import Board from "./components/board/Board";
import GameControlDiv from "./components/game_control/GameControlDiv";
import Player from "./components/board/Player";
import Game from "./components/board/Game";
import styles from "./App.module.css";
import GameModeIndicator from "./components/game_mode/GameModeIndicator";
import Modal from "./components/modal/Modal";

//mappings
import GAME_ACTIONS from "./mappings/GAME_ACTIONS";
import PLAYER_ACTIONS from "./mappings/PLAYER_ACTIONS";
import GAME_MODE from "./mappings/GAME_MODE";
import GAME_STATUS from "./mappings/GAME_STATUS";
import MODAL_ACTIONS from "./mappings/MODAL_ACTIONS";
import MODAL_CONTENT from "./mappings/MODAL_CONTENT";

// Game

const gameReducer = (state, action) => {
  switch (action.type) {
    case GAME_ACTIONS.CHANGE_GAME_STATUS:
      return { ...state, gameStatus: action.payload };
    case GAME_ACTIONS.CHANGE_GAME_MODE:
      return { ...state, gameMode: action.payload };
    case GAME_ACTIONS.SET_RACE:
      return { ...state, race: action.payload };
    case GAME_ACTIONS.RESET_RACE:
      return { ...state, race: 0 };
    case GAME_ACTIONS.HIDE_DICE:
      return { ...state, diceHidden: true };
    case GAME_ACTIONS.UNHIDE_DICE:
      return { ...state, diceHidden: false };
    case GAME_ACTIONS.SET_DICE_NUMBER:
      return { ...state, diceNumber: action.payload };
    default:
      throw new Error();
  }
};
const gameInitialConfigs = {
  gameStatus: GAME_STATUS.SETTING,
  gameMode: GAME_MODE.UNSELECTED,
  race: 0,
  diceHidden: true,
  diceNumber: 1,
};

// Player
const playerReducer = (state, action) => {
  switch (action.type) {
    case PLAYER_ACTIONS.START_PLAYING:
      return { ...state, isPlaying: true };
    case PLAYER_ACTIONS.STOP_PLAYING:
      return { ...state, isPlaying: false };
    case PLAYER_ACTIONS.UPDATE_ACCUMULATIVE_SCORE:
      return {
        ...state,
        accumulativeScore: state.accumulativeScore + state.currentScore,
      };
    case PLAYER_ACTIONS.RESET_ACCUMULATIVE_SCORE:
      return {
        ...state,
        accumulativeScore: 0,
      };
    case PLAYER_ACTIONS.UPDATE_CURRENT_SCORE:
      return {
        ...state,
        currentScore: state.currentScore + action.payload,
      };
    case PLAYER_ACTIONS.RESET_CURRENT_SCORE:
      return {
        ...state,
        currentScore: 0,
      };
    case PLAYER_ACTIONS.MARK_AS_WIINER:
      return {
        ...state,
        isWinner: true,
      };
    case PLAYER_ACTIONS.RESET_ISWINNER_PROPERTY:
      return {
        ...state,
        isWinner: false,
      };
    case PLAYER_ACTIONS.SET_TIME:
      return {
        ...state,
        timer: action.payload,
      };
    case PLAYER_ACTIONS.RESET_TIMER:
      return { ...state, timer: 0 };
    default:
      throw new Error();
  }
};

const playerAInitialConfigs = {
  name: "Player 1",
  isPlaying: true,
  accumulativeScore: 0,
  currentScore: 0,
  isWinner: false,
  timer: 0,
};

const playerBInitialConfigs = {
  name: "Player 2",
  isPlaying: false,
  accumulativeScore: 0,
  currentScore: 0,
  isWinner: false,
  timer: 0,
};

// Modal
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
    case MODAL_ACTIONS.CHANGE_TO_TIME_PICKER:
      return { ...state, modalContent: MODAL_CONTENT.TIME_PICKER };
    case MODAL_ACTIONS.CHANGE_TO_RACE_PICKER:
      return { ...state, modalContent: MODAL_CONTENT.RACE_PICKER };
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
  const [gameState, gameDispatch] = useReducer(gameReducer, gameInitialConfigs);

  const [playerAState, playerADispatch] = useReducer(
    playerReducer,
    playerAInitialConfigs
  );
  const [playerBState, playerBDispatch] = useReducer(
    playerReducer,
    playerBInitialConfigs
  );

  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    modalInitialConfigs
  );

  const [controlPanelShown, setControlPanelShown] = useState(true);
  const toggleControlPanel = () => {
    setControlPanelShown((curr) => !curr);
  };

  const [rulesPanelOpen, setRulesPanelOpen] = useState(false);
  const toggleRulesPanel = () => {
    setRulesPanelOpen((curr) => !curr);
  };

  // Function for initializing the game
  const initializeBoard = () => {
    playerADispatch({ type: PLAYER_ACTIONS.START_PLAYING });
    playerADispatch({ type: PLAYER_ACTIONS.RESET_ACCUMULATIVE_SCORE });
    playerADispatch({ type: PLAYER_ACTIONS.RESET_CURRENT_SCORE });
    playerADispatch({ type: PLAYER_ACTIONS.RESET_ISWINNER_PROPERTY });
    playerADispatch({ type: PLAYER_ACTIONS.RESET_TIMER });

    playerBDispatch({ type: PLAYER_ACTIONS.STOP_PLAYING });
    playerBDispatch({ type: PLAYER_ACTIONS.RESET_ACCUMULATIVE_SCORE });
    playerBDispatch({ type: PLAYER_ACTIONS.RESET_CURRENT_SCORE });
    playerBDispatch({ type: PLAYER_ACTIONS.RESET_ISWINNER_PROPERTY });
    playerBDispatch({ type: PLAYER_ACTIONS.RESET_TIMER });

    gameDispatch({ type: GAME_ACTIONS.HIDE_DICE });
    gameDispatch({ type: GAME_ACTIONS.SET_DICE_NUMBER, payload: 1 });
    gameDispatch({
      type: GAME_ACTIONS.CHANGE_GAME_MODE,
      payload: GAME_MODE.UNSELECTED,
    });
    gameDispatch({
      type: GAME_ACTIONS.RESET_RACE,
    });
  };

  return (
    <div className={styles.app}>
      <GameRulesDiv
        rulesPanelOpen={rulesPanelOpen}
        toggleRulesPanel={toggleRulesPanel}
      />
      <GameModeIndicator
        gameState={gameState}
        playerAState={playerAState}
        playerBState={playerBState}
      />
      <Modal
        modalState={modalState}
        modalDispatch={modalDispatch}
        gameDispatch={gameDispatch}
        initializeBoard={initializeBoard}
        playerAState={playerAState}
        playerBState={playerBState}
        playerADispatch={playerADispatch}
        playerBDispatch={playerBDispatch}
        controlPanelShown={controlPanelShown}
        toggleControlPanel={toggleControlPanel}
      />
      <Board gameState={gameState}>
        <Player playerState={playerAState} gameStatus={gameState.gameStatus} />
        <Player playerState={playerBState} gameStatus={gameState.gameStatus} />
        <Game
          playerAState={playerAState}
          playerBState={playerBState}
          playerADispatch={playerADispatch}
          playerBDispatch={playerBDispatch}
          gameState={gameState}
          gameDispatch={gameDispatch}
          modalDispatch={modalDispatch}
        />
      </Board>
      <GameControlDiv
        gameState={gameState}
        gameDispatch={gameDispatch}
        modalDispatch={modalDispatch}
        controlPanelShown={controlPanelShown}
        toggleControlPanel={toggleControlPanel}
        rulesPanelOpen={rulesPanelOpen}
        toggleRulesPanel={toggleRulesPanel}
      />
    </div>
  );
}

export default App;
