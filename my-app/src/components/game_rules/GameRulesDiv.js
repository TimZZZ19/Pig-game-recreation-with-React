import Button from "../reusables/Button";
import SidePanelDiv from "../reusables/SidePanelDiv";
import SidePanelWrapper from "../reusables/SidePanelWrapper";
import UnitTitle from "../reusables/UnitTitle";

import styles from "./GameRulesDiv.module.css";

const GameRulesDiv = ({ rulesPanelOpen, toggleRulesPanel }) => {
  return (
    <SidePanelDiv
      location={{ width: "25rem", left: "0", textAlign: "justify" }}
    >
      <Button
        buttonContent="❓"
        extraStyles={{ width: "4.2rem", top: "2rem", left: "15%" }}
        onClick={toggleRulesPanel}
      />

      <SidePanelWrapper
        panelDefaultPosition={{ transform: "translateX(-100%)" }}
        sidePanelShown={rulesPanelOpen}
        controlBtnContent="⏪"
        controlBtnHorizontalLocation={{ left: "13%" }}
        handleSidePanelBtn={toggleRulesPanel}
      >
        <div className={styles["rules-title-area"]}>
          <UnitTitle title={"game rules"} />
        </div>
        <div className={styles["rules-text-area"]}>
          <p className={styles["instructions"]}>
            Each turn, a player repeatedly rolls a die until either a 1 is
            rolled or the player holds and scores the sum of the rolls (i.e. the
            turn total). At any time during a player's turn, the player is faced
            with two decisions:
          </p>
          <br></br>
          <ul className={styles["decisions"]}>
            <li>
              <b>roll</b> - if the player rolls a
              <ul className={styles["outcomes"]}>
                <li>
                  <b>1</b> : the player scores nothing and it becomes the
                  opponent's turn.
                </li>
                <li>
                  <b>2 - 6</b> : the number is added to the player's turn total
                  and the player's turn continues.
                </li>
              </ul>
            </li>
            <li>
              <b>hold</b> - The turn total is added to the player's score and it
              becomes the opponent's turn.
            </li>
          </ul>
        </div>
        <div className={styles["modes-title-area"]}>
          <UnitTitle title={"How to win"} />
        </div>
        <div className={styles["game-modes-intro"]}>
          <ul>
            <li>
              <b>Timer</b> - when both players have run out of time, whoever
              scores higher wins.
            </li>
            <li>
              <b>Race</b> - whoever reaches the finish line first wins.
            </li>
          </ul>
        </div>
      </SidePanelWrapper>
    </SidePanelDiv>
  );
};

export default GameRulesDiv;
