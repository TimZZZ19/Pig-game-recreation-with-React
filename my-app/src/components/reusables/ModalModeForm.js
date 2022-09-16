import React from "react";
import styles from "./ModalModeForm.module.css";
import Button from "./Button";

const ModalModeForm = ({ title, children, confirmSelection, closeModal }) => {
  return (
    <div>
      <h1 className={styles["text"]}>{title}</h1>
      {children}
      <Button
        buttonContent="✔️ Confirm"
        extraStyles={{ width: "13rem", left: "37.5%", top: "19.2rem" }}
        onClick={confirmSelection}
      />
      <Button
        buttonContent="❌"
        extraStyles={{ width: "4rem", left: "85.5%", top: "19.2rem" }}
        onClick={closeModal}
      />
    </div>
  );
};

export default ModalModeForm;
