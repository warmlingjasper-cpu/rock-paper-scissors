import { useState } from 'react'
import ChoiceButton from './components/ChoiceButton'
import GameResult from './components/GameResult'

const choices = ["rock", "paper", "scissors"]

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length)

  return choices[randomIndex]
}

function determineWinner(player, computer) {
  if (player === computer) {
    return "draw"
  }

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win"
  }

  return "lose"
}

function App() {

  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState({
    player: 0,
    computer: 0,
    draws: 0
  })

  function handlePlayerChoice(choice) {
    const computer = getComputerChoice()

    setPlayerChoice(choice)
    setComputerChoice(computer)

    const gameResult = determineWinner(choice, computer)

    setResult(gameResult)

    if (gameResult === "win") {
      setScore(prev => ({
        ...prev,
        player: prev.player + 1
      }))
    }

    if (gameResult === "lose") {
      setScore(prev => ({
        ...prev,
        computer: prev.computer + 1
      }))
    }

    if (gameResult === "draw") {
      setScore(prev => ({
        ...prev,
        draws: prev.draws + 1
      }))
    }
    
  }

  return (
    <div>
      <h1>Rock Paper Scissors🎮</h1>

      <ChoiceButton choice="rock" onChoice={handlePlayerChoice} />
      <ChoiceButton choice="paper" onChoice={handlePlayerChoice} />
      <ChoiceButton choice="scissors" onChoice={handlePlayerChoice} />

      <GameResult
        playerChoice={playerChoice}
        computerChoice={computerChoice}
        result={result}
      />

      <p>Player: {score.player}</p>
      <p>Computer: {score.computer}</p>
      <p>Draws: {score.draws}</p>

    </div> 
  ) 
}

export default App