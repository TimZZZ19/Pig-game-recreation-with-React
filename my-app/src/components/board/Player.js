import styles from "./Player.module.css";
import GAME_STATUS from "../../mappings/GAME_STATUS";

const Player = ({ playerState, gameStatus }) => {
  const { name, isPlaying, accumulativeScore, currentScore } = playerState;
  const { PLAYING } = GAME_STATUS;

  return (
    <section
      className={`${styles["player"]} ${isPlaying && styles["player--active"]}`}
    >
      <h2 className={styles["name"]} id="name--0">
        {name}
      </h2>
      <p className={styles["score"]} id="score--0">
        {accumulativeScore}
      </p>
      <p
        className={`${styles["pig"]} ${
          [PLAYING].includes(gameStatus) && isPlaying && styles["pig-shown"]
        }`}
      >
        🐷
      </p>
      <div className={styles["current"]}>
        <p className={styles["current-label"]}>Current</p>
        <p className={styles["current-score"]} id="current--0">
          {currentScore}
        </p>
      </div>
    </section>
  );
};

export default Player;
