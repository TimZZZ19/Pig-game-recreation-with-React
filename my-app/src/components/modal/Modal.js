import React from "react";
import styles from "./Modal.module.css";
import CountDown from "./CountDown";

const Modal = ({ modalOpen, countDownStarted }) => {
  if (!modalOpen) return null;

  let modalContent;
  if (countDownStarted) modalContent = <CountDown />;

  return <div className={styles.modal}>{modalContent}</div>;
};

export default Modal;
