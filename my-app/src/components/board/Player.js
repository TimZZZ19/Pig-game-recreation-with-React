import styles from "./Player.module.css";

const Player = ({ playerStatus, player, playerScore, currScore }) => {
  return (
    <section
      className={`${styles["player"]} ${
        playerStatus && styles["player--active"]
      }`}
    >
      <h2 className={styles["name"]} id="name--0">
        {player}
      </h2>
      <p className={styles["score"]} id="score--0">
        {playerScore}
      </p>
      <div className={styles["current"]}>
        <p className={styles["current-label"]}>Current</p>
        <p className={styles["current-score"]} id="current--0">
          {currScore}
        </p>
      </div>
    </section>
  );
};

export default Player;
