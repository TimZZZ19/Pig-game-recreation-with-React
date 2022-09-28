import ControlPanel from "./ControlPanel";
import Button from "../reusables/Button";
import PushBack from "../reusables/PushBack";
import SidePanelDiv from "../reusables/SidePanelDiv";

import GAME_ACTIONS from "../../mappings/GAME_ACTIONS";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";
import GAME_MODE from "../../mappings/GAME_MODE";
import GAME_STATUS from "../../mappings/GAME_STATUS";

const GameControlDiv = ({
  gameState,
  gameDispatch,
  modalDispatch,
  controlPanelShown,
  handleControlPanelSideButton,
}) => {
  const openModal = () => {
    gameDispatch({
      type: GAME_ACTIONS.CHANGE_GAME_STATUS,
      payload: GAME_STATUS.FROZEN,
    });
    modalDispatch({ type: MODAL_ACTIONS.OPEN_MODAL });
  };

  const startGame = () => {
    if (gameState.gameMode === GAME_MODE.WARNING) return;
    if (gameState.gameMode === GAME_MODE.UNSELECTED) {
      gameDispatch({
        type: GAME_ACTIONS.CHANGE_GAME_MODE,
        payload: GAME_MODE.WARNING,
      });

      setTimeout(() => {
        gameDispatch({
          type: GAME_ACTIONS.CHANGE_GAME_MODE,
          payload: GAME_MODE.UNSELECTED,
        });
      }, 1000);

      return;
    }

    openModal();
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_COUNTDOWN });

    // Reset modal content to null and close modal
    PushBack(() => {
      modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_NULL });
      modalDispatch({ type: MODAL_ACTIONS.CLOSE_MODAL });
      setTimeout(() => {
        handleControlPanelSideButton();
      }, 1000);
    });

    PushBack(() =>
      gameDispatch({
        type: GAME_ACTIONS.CHANGE_GAME_STATUS,
        payload: GAME_STATUS.PLAYING,
      })
    );
  };

  const pauseGame = () =>
    gameDispatch({
      type: GAME_ACTIONS.CHANGE_GAME_STATUS,
      payload: GAME_STATUS.PAUSED,
    });

  const openConfirm = () => {
    openModal();
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_CONFIRM });
  };

  const openTimePicker = () => {
    openModal();
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_TIME_PICKER });
  };

  const openRacePicker = () => {
    openModal();
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_RACE_PICKER });
  };

  return (
    <SidePanelDiv location={{ right: "0" }}>
      <Button
        buttonContent="⏪"
        extraStyles={{ width: "4.2rem", top: "2rem", left: "80%" }}
        onClick={handleControlPanelSideButton}
      />
      <ControlPanel
        controlPanelShown={controlPanelShown}
        handleControlPanelSideButton={handleControlPanelSideButton}
        startGame={startGame}
        gameState={gameState}
        pauseGame={pauseGame}
        openConfirm={openConfirm}
        openTimePicker={openTimePicker}
        openRacePicker={openRacePicker}
      />
    </SidePanelDiv>
  );
};

export default GameControlDiv;
