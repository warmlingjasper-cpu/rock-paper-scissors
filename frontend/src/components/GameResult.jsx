function GameResult({ playerChoice, computerChoice, result }) {

  if (!result) {
    return <p>Choose your move!</p>
  }

  const emojis = {
    rock: "Rock",
    paper: "Paper",
    scissors: "Scissors",
    lizard: "Lizard",
    spock: "Spock"
  }

  const messages = {
    win: "You Win!",
    lose: "You Lose!",
    draw: "It's a Draw!"
  }

  return (
    <div className="game-result">
      <p>You picked: {emojis[playerChoice]}</p>
      <p>The house picked: {emojis[computerChoice]}</p>

      <h2>{messages[result]}</h2>
    </div>
  )
}

export default GameResult