import styles from "./Button.module.css";

const Button = ({
  buttonContent,
  extraStyles,
  secondaryClass,
  tertiaryClass,
  onClick,
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[secondaryClass]} ${styles[tertiaryClass]}`}
      style={extraStyles}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
