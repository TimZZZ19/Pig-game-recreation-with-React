import React from "react";
// import styles from "./TimePicker.module.css";
import ModalModeForm from "../../reusables/ModalModeForm";

const TimePicker = ({ closeModal }) => {
  return (
    <ModalModeForm
      title={"Pick a timer"}
      closeModal={closeModal}
    ></ModalModeForm>
  );
};

export default TimePicker;
