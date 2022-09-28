import React from "react";
import styles from "./SidePanelWrapper.module.css";
import Button from "./Button";

const SidePanelWrapper = ({
  children,
  panelDefaultPosition,
  sidePanelShown,
  controlBtnContent,
  controlBtnHorizontalLocation,
  handleSidePanelBtn,
}) => {
  const basicControlBtnInlineStyle = { width: "4.2rem", top: "2rem" };
  const mergedControlBtnInlineStyle = {
    ...basicControlBtnInlineStyle,
    ...controlBtnHorizontalLocation,
  };

  return (
    <div
      className={`${styles["side-panel"]} ${
        sidePanelShown && styles["side-panel--show"]
      }`}
      style={panelDefaultPosition}
    >
      <Button
        buttonContent={controlBtnContent}
        extraStyles={mergedControlBtnInlineStyle}
        onClick={handleSidePanelBtn}
      />

      {children}
    </div>
  );
};

export default SidePanelWrapper;
