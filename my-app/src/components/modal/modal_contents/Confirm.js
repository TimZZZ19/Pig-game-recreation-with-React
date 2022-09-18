import Button from "../../reusables/Button";
import styles from "./Confirm.module.css";

const Confirm = ({ restartGame, cancelRestart }) => {
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
