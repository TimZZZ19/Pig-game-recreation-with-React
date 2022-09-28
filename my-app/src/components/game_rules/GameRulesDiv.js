import { useState } from "react";
import Button from "../reusables/Button";
import SidePanelDiv from "../reusables/SidePanelDiv";
import SidePanelWrapper from "../reusables/SidePanelWrapper";

const GameRulesDiv = () => {
  const [rulesPanelOpen, setRulesPanelOpen] = useState(false);

  const openRulesPanel = () => {
    setRulesPanelOpen(true);
  };

  const closeRulesPanel = () => {
    setRulesPanelOpen(false);
  };

  return (
    <SidePanelDiv location={{ left: "0" }}>
      <Button
        buttonContent="❓"
        extraStyles={{ width: "4.2rem", top: "2rem", left: "20%" }}
        onClick={openRulesPanel}
      />

      <SidePanelWrapper
        panelDefaultPosition={{ transform: "translateX(-100%)" }}
        sidePanelShown={rulesPanelOpen}
        controlBtnContent="⏪"
        controlBtnHorizontalLocation={{ left: "20%" }}
        handleSidePanelBtn={closeRulesPanel}
      >
        "All the rules go here"
      </SidePanelWrapper>
    </SidePanelDiv>
  );
};

export default GameRulesDiv;
