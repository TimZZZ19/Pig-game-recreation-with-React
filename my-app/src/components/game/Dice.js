import "./Dice.css";

const Dice = (props) => {
  const imgURL = [
    require("../../img/dice-1.png"),
    require("../../img/dice-2.png"),
    require("../../img/dice-3.png"),
    require("../../img/dice-4.png"),
    require("../../img/dice-5.png"),
    require("../../img/dice-6.png"),
  ];

  const arrayIndex = props.diceNumber - 1;

  return (
    <img
      src={imgURL[arrayIndex].default}
      alt="Playing dice"
      className={`${"dice"} ${props.hideDice && "hidden"}`}
    />
  );
};

export default Dice;
