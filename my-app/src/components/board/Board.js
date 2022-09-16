import styles from "./Board.module.css";
import GAME_STATUS from "../../mappings/GAME_STATUS";

const Board = ({ children, gameState }) => {
  return (
    <div
      className={`${styles.board} ${
        gameState.gameState !== GAME_STATUS.PLAYING && styles["board-inactive"]
      }`}
    >
      {children}
    </div>
  );
};

export default Board;
