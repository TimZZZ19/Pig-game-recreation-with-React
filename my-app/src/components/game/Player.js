import "./Player.css";

const Player = (props) => {
  return (
    <section className={`${"player"} ${props.playerStatus}`}>
      <h2 className="name" id="name--0">
        {props.player}
      </h2>
      <p className="score" id="score--0">
        {props.playerScore}
      </p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score" id="current--0">
          {props.currScore}
        </p>
      </div>
    </section>
  );
};

export default Player;
