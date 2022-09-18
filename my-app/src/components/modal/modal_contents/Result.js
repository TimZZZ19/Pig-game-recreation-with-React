import React from "react";

const Result = ({ playerAState, playerBState }) => {
  let winner;
  if (playerAState.isWinner) winner = playerAState.name;
  if (playerBState.isWinner) winner = playerBState.name;

  return <div>Result</div>;
};

export default Result;
