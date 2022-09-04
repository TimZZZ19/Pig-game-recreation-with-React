import "./Button.css";

const Button = (props) => {
  // const holdClickHandler = () => {
  //   console.log("switch");
  // };

  return (
    <button
      className={`${"btn"} ${props.className}`}
      onClick={props.onClick}
      style={props.width}
    >
      {props.buttonContent}
    </button>
  );
};

export default Button;
