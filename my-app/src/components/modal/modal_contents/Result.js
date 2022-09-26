import React from "react";
import Button from "../../reusables/Button";
import styles from "./Result.module.css";

const Result = ({
  playerAState,
  playerBState,
  restartGame,
  handlePanelButton,
}) => {
  let result;

  if (!playerAState.isWinner && !playerBState.isWinner) {
    // Draw
    result = (
      <>
        <p className={styles["winner-text"]}>Draw</p>
        <p className={`${styles["won-text"]} ${styles["draw-text"]}`}>
          Rematch?
        </p>
        <p className={styles["trophy"]}>🎲</p>
      </>
    );
  } else {
    const winner = playerAState.isWinner
      ? playerAState.name
      : playerBState.name;

    result = (
      <>
        <p className={styles["winner-text"]}>{winner}</p>
        <p className={styles["won-text"]}>won!</p>
        <p className={styles["trophy"]}>🏆</p>
      </>
    );
  }

  const newGameHandler = () => {
    restartGame();
    handlePanelButton();
  };

  return (
    <>
      {result}
      <Button
        buttonContent="🔄 New Game"
        extraStyles={{ width: "15rem", top: "19rem" }}
        onClick={newGameHandler}
      />
    </>
  );
};

export default Result;
