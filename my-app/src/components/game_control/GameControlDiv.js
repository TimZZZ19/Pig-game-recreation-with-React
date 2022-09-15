import { useState } from "react";
import styles from "./GameControlDiv.module.css";
import ControlPanel from "./ControlPanel";
import Button from "../reusables/Button";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";
import PushBack from "../reusables/PushBack";

const GameControlDiv = ({
  gameMode,
  setGameMode,
  gameStatus,
  setGameStatus,
  modalDispatch,
}) => {
  const [controlPanelShown, setControlPanelShown] = useState(true);

  const handleExpandButton = () => setControlPanelShown((curr) => !curr);

  const countDown = () => {
    // Open modal and start counting down
    modalDispatch({ type: MODAL_ACTIONS.OPEN_MODAL });
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_COUNTDOWN });

    // Reset modal content to null and close modal
    PushBack(() => {
      modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_NULL });
      modalDispatch({ type: MODAL_ACTIONS.CLOSE_MODAL });
    });
  };

  const openConfirm = () => {
    modalDispatch({ type: MODAL_ACTIONS.OPEN_MODAL });
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_CONFIRM });
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
        countDown={countDown}
        gameMode={gameMode}
        setGameMode={setGameMode}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        openConfirm={openConfirm}
      />
    </div>
  );
};

export default GameControlDiv;
