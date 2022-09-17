import React from "react";
import styles from "./Race.module.css";

const Race = ({ race }) => {
  return (
    <div className={styles["finish-line"]}>
      <span>{race}</span>
    </div>
  );
};

export default Race;
