function Score({ score }) {
  return (
    <div className="score">
      <h2>Score</h2>

      <div className="score-board">
        <div>
          <span>Player</span>
          <strong>{score.player}</strong>
        </div>

        <div>
          <span>Computer</span>
          <strong>{score.computer}</strong>
        </div>

        <div>
          <span>Draws</span>
          <strong>{score.draws}</strong>
        </div>
      </div>
    </div>
  )
}

export default Score
