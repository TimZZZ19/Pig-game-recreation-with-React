import React from "react";
import styles from "./SidePanelDiv.module.css";

const SidePanelDiv = ({ children, location }) => {
  return (
    <div className={styles["side-panel-div"]} style={location}>
      {children}
    </div>
  );
};

export default SidePanelDiv;
