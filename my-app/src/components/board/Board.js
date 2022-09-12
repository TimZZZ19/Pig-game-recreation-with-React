import styles from "./Board.module.css";
import STATUS from "../../mappings/STATUS";

const Board = ({ children, gameStatus }) => {
  return (
    <div
      className={`${styles.board} ${
        gameStatus !== STATUS.PLAYING && styles["board-inactive"]
      }`}
    >
      {children}
    </div>
  );
};

export default Board;
