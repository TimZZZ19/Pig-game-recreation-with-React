import React from "react";
import styles from "./Modal.module.css";
import CountDown from "./CountDown";
import MODAL_CONTENT from "../../mappings/MODAL_CONTENT";
import Result from "./Result";

const Modal = ({ modalState, modalDispatch }) => {
  const { modalOpen, modalContent } = modalState;

  if (!modalOpen) return null;

  let content;
  switch (modalContent) {
    case MODAL_CONTENT.COUNT_DOWN:
      content = <CountDown modalDispatch={modalDispatch} />;
      break;
    case MODAL_CONTENT.RESULT:
      content = <Result />;
      break;
    default:
      throw new Error();
  }

  return <div className={styles.modal}>{content}</div>;
};

export default Modal;
