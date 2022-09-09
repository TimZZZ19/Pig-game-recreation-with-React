import React from "react";
import styles from "./UnitTitle.module.css";

const UnitTitle = ({ title }) => {
  return <h1 className={styles["unit-title"]}>{title}</h1>;
};

export default UnitTitle;
