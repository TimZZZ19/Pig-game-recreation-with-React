import React from "react";
import Button from "../reusables/Button";
import SidePanelDiv from "../reusables/SidePanelDiv";
import SidePanelWrapper from "../reusables/SidePanelWrapper";

const GameRulesDiv = () => {
  return (
    <SidePanelDiv location={{ left: "0" }}>
      <Button
        buttonContent="❓"
        extraStyles={{ width: "4.2rem", top: "2rem", left: "20%" }}
      />
    </SidePanelDiv>
  );
};

export default GameRulesDiv;
