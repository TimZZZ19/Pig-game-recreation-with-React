import React from "react";
// import styles from "./RacePicker.module.css";
import ModalModeForm from "../../reusables/ModalModeForm";

const RacePicker = ({ closeModal }) => {
  return (
    <ModalModeForm
      title={"Pick a race"}
      closeModal={closeModal}
    ></ModalModeForm>
  );
};

export default RacePicker;
