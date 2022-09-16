import styles from "./Board.module.css";
import GAME_STATUS from "../../mappings/GAME_STATUS";

const Board = ({ children, gameStatus }) => {
  return (
    <div
      className={`${styles.board} ${
        gameStatus !== GAME_STATUS.PLAYING && styles["board-inactive"]
      }`}
    >
      {children}
    </div>
  );
};

export default Board;
