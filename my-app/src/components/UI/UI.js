import Button from "./Button";

const UI = (props) => {
  // When Roll is clicked on,
  const rollClickHandler = () =>
    // roll the dice
    props.passDiceResult(rollDice(1, 6));

  // generate a random number between min and max inclusively.
  const rollDice = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  return (
    <div>
      <Button
        className="btn--new"
        buttonContent="🔄 New game"
        onClick={props.newGameOnClick}
      />
      <Button
        className="btn--roll"
        buttonContent={"🎲 Roll"}
        width={{ width: "15rem" }}
        onClick={rollClickHandler}
      />
      <Button
        className="btn--hold"
        buttonContent={"📥 Hold"}
        width={{ width: "15rem" }}
        onClick={props.holdOnClick}
      />
    </div>
  );
};

export default UI;
