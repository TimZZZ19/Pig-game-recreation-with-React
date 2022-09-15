import STATUS from "../../mappings/STATUS";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";
import Button from "../reusables/Button";
import styles from "./Confirm.module.css";

const Confirm = ({ modalDispatch, setGameStatus, initializeBoard }) => {
  const closeModal = () => {
    modalDispatch({ type: MODAL_ACTIONS.CHANGE_TO_NULL });
    modalDispatch({ type: MODAL_ACTIONS.CLOSE_MODAL });
  };

  const restartGame = () => {
    setGameStatus(STATUS.SETTING);
    initializeBoard();
    closeModal();
  };

  const cancelRestart = () => {
    setGameStatus(STATUS.PAUSED);
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
