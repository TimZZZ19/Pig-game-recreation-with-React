import React from "react";
import styles from "./Timer.module.css";

const Timer = () => {
  return (
    <div className={styles.timer}>
      <span className={styles.minutes}>01</span>
      <span className={styles.colon}> : </span>
      <span className={styles.seconds}>00</span>
    </div>
  );
};

export default Timer;
