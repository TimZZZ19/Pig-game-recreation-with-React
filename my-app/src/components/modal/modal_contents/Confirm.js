import Button from "../../reusables/Button";
import styles from "./Confirm.module.css";

import GAME_ACTIONS from "../../../mappings/GAME_ACTIONS";
import GAME_STATUS from "../../../mappings/GAME_STATUS";
import MODAL_ACTIONS from "../../../mappings/MODAL_ACTIONS";

const Confirm = ({ modalDispatch, gameDispatch, initializeBoard }) => {
  const closeModal = () => {
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_NULL });
    modalDispatch({ type: MODAL_ACTIONS.CLOSE_MODAL });
  };

  const restartGame = () => {
    gameDispatch({
      type: GAME_ACTIONS.CHANGE_GAME_STATUS,
      payload: GAME_STATUS.SETTING,
    });
    initializeBoard();
    closeModal();
  };

  const cancelRestart = () => {
    gameDispatch({
      type: GAME_ACTIONS.CHANGE_GAME_STATUS,
      payload: GAME_STATUS.PAUSED,
    });
    closeModal();
  };

  return (
    <div>
      <h1 className={styles["confirm-text"]}>CONFIRM?</h1>
      <Button
        buttonContent="✔️ Yes"
        extraStyles={{ width: "14rem", top: "13.8rem" }}
        onClick={restartGame}
      />
      <Button
        buttonContent="❌ No"
        extraStyles={{ width: "14rem", top: "18.8rem" }}
        onClick={cancelRestart}
      />
    </div>
  );
};

export default Confirm;
