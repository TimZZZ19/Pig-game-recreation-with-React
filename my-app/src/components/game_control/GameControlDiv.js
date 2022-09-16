import { useState } from "react";
import styles from "./GameControlDiv.module.css";
import ControlPanel from "./ControlPanel";
import Button from "../reusables/Button";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";
import PushBack from "../reusables/PushBack";
import MODE from "../../mappings/MODE";
import STATUS from "../../mappings/STATUS";

const GameControlDiv = ({
  gameMode,
  setGameMode,
  gameStatus,
  setGameStatus,
  modalDispatch,
}) => {
  const [controlPanelShown, setControlPanelShown] = useState(true);

  const openModal = () => {
    setGameStatus(STATUS.FROZEN);
    modalDispatch({ type: MODAL_ACTIONS.OPEN_MODAL });
  };

  const handleExpandButton = () => setControlPanelShown((curr) => !curr);

  const startGame = () => {
    if (gameMode === MODE.WARNING) return;
    if (gameMode === MODE.UNSELECTED) {
      setGameMode(MODE.WARNING);

      setTimeout(() => {
        setGameMode(MODE.UNSELECTED);
      }, 1000);

      return;
    }

    openModal();
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_COUNTDOWN });

    // Reset modal content to null and close modal
    PushBack(() => {
      modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_NULL });
      modalDispatch({ type: MODAL_ACTIONS.CLOSE_MODAL });
    });

    PushBack(() => setGameStatus(STATUS.PLAYING));
  };

  const pauseGame = () => setGameStatus(STATUS.PAUSED);

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
    <div className={styles["game-control"]}>
      <Button
        buttonContent="⏪"
        extraStyles={{ width: "4.2rem", top: "2rem", left: "80%" }}
        onClick={handleExpandButton}
      />
      <ControlPanel
        controlPanelShown={controlPanelShown}
        handleExpandButton={handleExpandButton}
        startGame={startGame}
        gameMode={gameMode}
        gameStatus={gameStatus}
        pauseGame={pauseGame}
        openConfirm={openConfirm}
        openTimePicker={openTimePicker}
        openRacePicker={openRacePicker}
      />
    </div>
  );
};

export default GameControlDiv;
