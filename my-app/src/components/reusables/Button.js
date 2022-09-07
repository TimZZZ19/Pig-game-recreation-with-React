import styles from "./Button.module.css";

const Button = ({ buttonContent, extraStyles, secondaryClass, onClick }) => {
  return (
    <button
      className={`${styles.btn} ${styles[secondaryClass]}`}
      style={extraStyles}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
