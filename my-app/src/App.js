import { useState } from "react";
import Board from "./components/UI/Board";
import UI from "./components/UI/UI";
import Player from "./components/game/Player";
import Dice from "./components/game/Dice";

function App() {
  // Basic game data
  const playerAName = "Player 1";
  const playerBName = "Player 2";

  const [playerAStatus, setPlayerAStatus] = useState("player--active");
  const [playerBStatus, setPlayerBStatus] = useState("not playing");

  const [playerAScore, setPlayerAScore] = useState(0);
  const [playerBScore, setPlayerBScore] = useState(0);

  const [currAScore, setCurrAScore] = useState(0);
  const [currBScore, setCurrBScore] = useState(0);

  const [diceNumber, setDiceNumber] = useState(1);

  const [diceHidden, setDiceHidden] = useState(true);

  // Fundamental functions

  // When New Game is clicked on,
  const newGameHandler = () => {
    setPlayerAStatus("player--active");
    setPlayerBStatus("not playing");
    setPlayerAScore(0);
    setPlayerBScore(0);
    setCurrAScore(0);
    setCurrBScore(0);
    setDiceNumber(1);
    setDiceHidden(true);
  };

  // When Roll is clicked on,
  const diceResultHandler = (diceResult) => {
    // 1. Reveal dice
    setDiceHidden(false);

    // 2. Update the displayed dice image according to this result.
    setDiceNumber(diceResult);

    // 3. Update the displayed current score.

    if (playerAStatus === "player--active") {
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

  // When Hold is clicked on,
  const holdClickHandler = () => {
    setDiceHidden(true);
    if (playerAStatus === "player--active") {
      // if A is active, update score and switch to B.
      setPlayerAScore(playerAScore + currAScore);
      ResetAAndSwitchToB();
    } else {
      // if B is active, update score and switch to A.
      setPlayerBScore(playerBScore + currBScore);
      ResetBAndSwitchToA();
    }
  };

  // Reset current score and switch turn.
  const ResetAAndSwitchToB = () => {
    setCurrAScore(0);
    setPlayerAStatus("not playing");
    setPlayerBStatus("player--active");
  };
  const ResetBAndSwitchToA = () => {
    setCurrBScore(0);
    setPlayerAStatus("player--active");
    setPlayerBStatus("not playing");
  };

  return (
    <div>
      <Board>
        <Player
          player={playerAName}
          playerStatus={playerAStatus}
          playerScore={playerAScore}
          currScore={currAScore}
        />
        <Player
          player={playerBName}
          playerStatus={playerBStatus}
          playerScore={playerBScore}
          currScore={currBScore}
        />
        <Dice diceNumber={diceNumber} hideDice={diceHidden} />
        <UI
          newGameOnClick={newGameHandler}
          passDiceResult={diceResultHandler}
          holdOnClick={holdClickHandler}
        />
      </Board>
    </div>
  );
}

export default App;
