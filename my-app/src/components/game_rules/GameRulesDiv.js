import React from "react";
import Button from "../reusables/Button";
import SidePanel from "../reusables/SidePanel";

const GameRulesDiv = () => {
  return (
    <SidePanel location={{ left: "0" }}>
      <Button
        buttonContent="❓"
        extraStyles={{ width: "4.2rem", top: "2rem", left: "20%" }}
      />
    </SidePanel>
  );
};

export default GameRulesDiv;
