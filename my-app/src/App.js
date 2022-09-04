import { useState } from "react";
import Board from "./components/board/Board";
import Player from "./components/board/Player";
import Dice from "./components/board/Dice";
import Button from "./components/reusables/Button";

function App() {
  // ******************************* //
  // COMMENT GLOBAL VARIALBES
  // ******************************* //

  // States
  const playerAName = "Player 1";
  const playerBName = "Player 2";

  const [playerAPlaying, setPlayerAPlaying] = useState(true);
  const [playerBPlaying, setPlayerBPlaying] = useState(false);

  const [playerAScore, setPlayerAScore] = useState(0);
  const [playerBScore, setPlayerBScore] = useState(0);

  const [currAScore, setCurrAScore] = useState(0);
  const [currBScore, setCurrBScore] = useState(0);

  const [diceNumber, setDiceNumber] = useState(1);

  const [diceHidden, setDiceHidden] = useState(true);

  // Helper functions -
  const ResetAAndSwitchToB = () => {
    setCurrAScore(0);
    setPlayerAPlaying(false);
    setPlayerBPlaying(true);
  };
  const ResetBAndSwitchToA = () => {
    setCurrBScore(0);
    setPlayerAPlaying(true);
    setPlayerBPlaying(false);
  };
  const handleDiceResult = (diceResult) => {
    // 1. Reveal dice
    setDiceHidden(false);

    // 2. Update the displayed dice image according to this result.
    setDiceNumber(diceResult);

    // 3. Update the displayed current score.

    if (playerAPlaying) {
      // if A is playing ...
      if (diceResult === 1) {
        // Reset current score and switch turn
        ResetAAndSwitchToB();
      } else {
        setCurrAScore(currAScore + diceResult);
      }
    } else {
      // if B is playing ...
      if (diceResult === 1) {
        ResetBAndSwitchToA();
      } else {
        setCurrBScore(currBScore + diceResult);
      }
    }
  };

  // ******************************* //
  // COMMENT UTILITY FUNCTIONS
  // ******************************* //

  // When New Game is clicked on,
  const resetGame = () => {
    setPlayerAPlaying(true);
    setPlayerBPlaying(false);
    setPlayerAScore(0);
    setPlayerBScore(0);
    setCurrAScore(0);
    setCurrBScore(0);
    setDiceNumber(1);
    setDiceHidden(true);
  };

  // When Roll is clicked on,
  const rollClickHandler = () => {
    const rollDice = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const diceResult = rollDice(1, 6);
    handleDiceResult(diceResult);
  };

  // When Hold is clicked on,
  const holdClickHandler = () => {
    setDiceHidden(true);
    if (playerAPlaying === true) {
      // if A is active, update score and switch to B.
      setPlayerAScore(playerAScore + currAScore);
      ResetAAndSwitchToB();
    } else {
      // if B is active, update score and switch to A.
      setPlayerBScore(playerBScore + currBScore);
      ResetBAndSwitchToA();
    }
  };

  return (
    <div>
      <Board>
        <Player
          player={playerAName}
          playerStatus={playerAPlaying}
          playerScore={playerAScore}
          currScore={currAScore}
        />
        <Player
          player={playerBName}
          playerStatus={playerBPlaying}
          playerScore={playerBScore}
          currScore={currBScore}
        />
        <Button
          buttonContent="🔄 New game"
          extraStyles={{ width: "auto", top: "4rem" }}
          onClick={resetGame}
        />
        <Dice diceNumber={diceNumber} hideDice={diceHidden} />
        <Button
          buttonContent={"🎲 Roll"}
          extraStyles={{ width: "15rem", top: "39.3rem" }}
          onClick={rollClickHandler}
        />
        <Button
          buttonContent={"📥 Hold"}
          extraStyles={{ width: "15rem", top: "46.1rem" }}
          onClick={holdClickHandler}
        />
      </Board>
    </div>
  );
}

export default App;
