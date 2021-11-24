import "./Button.css";

const Button = (props) => {
  // const holdClickHandler = () => {
  //   console.log("switch");
  // };
  return (
    <button className={`${"btn"} ${props.className}`} onClick={props.onClick}>
      {props.buttonContent}
    </button>
  );
};

export default Button;
