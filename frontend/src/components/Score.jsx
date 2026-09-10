function Score({ score }) {
  return (
    <div className="score">
      <h2>Score</h2>

      <div className="score-board">
        <div>
          <strong>{score.player}</strong>
        </div>
      </div>
    </div>
  )
}

export default Score
