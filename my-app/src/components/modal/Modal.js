import React from "react";
import styles from "./Modal.module.css";
import CountDown from "./modal_contents/CountDown";
import Result from "./modal_contents/Result";
import Confirm from "./modal_contents/Confirm";
import TimePicker from "./modal_contents/TimePicker";
import RacePicker from "./modal_contents/RacePicker";

import GAME_ACTIONS from "../../mappings/GAME_ACTIONS";
import MODAL_CONTENT from "../../mappings/MODAL_CONTENT";
import GAME_STATUS from "../../mappings/GAME_STATUS";
import MODAL_ACTIONS from "../../mappings/MODAL_ACTIONS";

const Modal = ({
  modalState,
  modalDispatch,
  gameDispatch,
  initializeBoard,
}) => {
  const { modalOpen, modalContent } = modalState;

  if (!modalOpen) return null;

  const closeModal = () => {
    gameDispatch({
      type: GAME_ACTIONS.CHANGE_GAME_STATUS,
      payload: GAME_STATUS.SETTING,
    });
    modalDispatch({ type: MODAL_ACTIONS.CLOSE_MODAL });
  };

  let content;
  switch (modalContent) {
    case MODAL_CONTENT.COUNT_DOWN:
      content = <CountDown />;
      break;
    case MODAL_CONTENT.RESULT:
      content = <Result />;
      break;
    case MODAL_CONTENT.CONFIRM:
      content = (
        <Confirm
          modalDispatch={modalDispatch}
          gameDispatch={gameDispatch}
          initializeBoard={initializeBoard}
        />
      );
      break;
    case MODAL_CONTENT.TIME_PICKER:
      content = (
        <TimePicker closeModal={closeModal} gameDispatch={gameDispatch} />
      );
      break;
    case MODAL_CONTENT.RACE_PICKER:
      content = (
        <RacePicker closeModal={closeModal} gameDispatch={gameDispatch} />
      );
      break;
    case MODAL_CONTENT.NULL:
      content = null;
      break;
    default:
      throw new Error();
  }

  return <div className={styles.modal}>{content}</div>;
};

export default Modal;
