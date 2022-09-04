import styles from "./Button.module.css";

const Button = ({ buttonContent, extraStyles, onClick }) => {
  return (
    <button className={styles.btn} style={extraStyles} onClick={onClick}>
      {buttonContent}
    </button>
  );
};

export default Button;
