import React from "react";
import Button from "../../reusables/Button";
import styles from "./Result.module.css";

const Result = ({ playerAState, playerBState, restartGame }) => {
  let winner;
  if (playerAState.isWinner) winner = playerAState.name;
  if (playerBState.isWinner) winner = playerBState.name;

  let result = (
    <>
      <p className={styles["winner-text"]}>{winner}</p>
      <p className={styles["won-text"]}>won!</p>
      <p className={styles["trophy"]}>🏆</p>
    </>
  );

  if (!playerAState.isWinner && !playerBState.isWinner) {
    result = (
      <>
        <p className={styles["winner-text"]}>Draw</p>
        <p className={`${styles["won-text"]} ${styles["draw-text"]}`}>
          Rematch?
        </p>
        <p className={styles["trophy"]}>🎲</p>
      </>
    );
  }

  return (
    <>
      {result}
      <Button
        buttonContent="🔄 New Game"
        extraStyles={{ width: "15rem", top: "19rem" }}
        onClick={restartGame}
      />
    </>
  );
};

export default Result;
