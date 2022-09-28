import React from "react";
import styles from "./SidePanel.module.css";

const SidePanel = ({ children, location }) => {
  return (
    <div className={styles["side-panel-div"]} style={location}>
      {children}
    </div>
  );
};

export default SidePanel;
