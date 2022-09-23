import styles from "./Player.module.css";

const Player = ({ playerState, gameStatus }) => {
  const { name, isPlaying, accumulativeScore, currentScore } = playerState;

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
