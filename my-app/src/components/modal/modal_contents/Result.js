import React from "react";
import Button from "../../reusables/Button";
import styles from "./Result.module.css";

const Result = ({ playerAState, playerBState, restartGame }) => {
  const winner = playerAState.isWinner ? playerAState.name : playerBState.name;

  return (
    <>
      <p className={styles["winner-text"]}>{winner}</p>
      <p className={styles["won-text"]}>won!</p>
      <p className={styles["trophy"]}>🏆</p>
      <Button
        buttonContent="🔄 New Game"
        extraStyles={{ width: "15rem", top: "19rem" }}
        onClick={restartGame}
      />
    </>
  );
};

export default Result;
