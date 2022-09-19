import React from "react";
import styles from "./Timer.module.css";

const Timer = ({ timeString }) => {
  return (
    <div className={styles.timer}>
      <span className={styles.minutes}>{timeString}</span>
    </div>
  );
};

export default Timer;
