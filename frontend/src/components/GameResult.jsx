function GameResult({ playerChoice, computerChoice, result }) {
  return (
    <div>
      <p>Your choice: {playerChoice}</p>
      <p>Computer choice: {computerChoice}</p>
      <p>Result: {result}</p>
    </div>
  )
}

export default GameResult