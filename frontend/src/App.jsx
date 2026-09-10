import { useState } from 'react'
import ChoiceButton from './components/ChoiceButton'
import GameResult from './components/GameResult'
import Score from './components/Score'
import './App.css'

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
  const [isSpinning, setIsSpinning] = useState(false)
  const [showFinalChoices, setShowFinalChoices] = useState(false)
  const [score, setScore] = useState({
    player: 0,
    computer: 0,
    draws: 0
  })

  function handlePlayerChoice(choice) {
    setIsSpinning(true)

    const computer = getComputerChoice()

    setPlayerChoice(choice)
    setComputerChoice(computer)

    const gameResult = determineWinner(choice, computer)

    setTimeout(() => {

      setPlayerChoice(choice)
      setComputerChoice(computer)
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
      setIsSpinning(false)
      setShowFinalChoices(true)

    }, 1500)
  }

  function playAgain() {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setShowFinalChoices(false)
  }

  function resetGame() {
    setScore({
      player: 0,
      computer: 0,
      draws: 0
    })

    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setShowFinalChoices(false)
  }

  return (
    <div className="game">
      <h1>Rock Paper Scissors</h1>
      <div className="game-area">
        <div className="game-buttons">

          <button className="reset-button" onClick={playAgain}>
            Play Again
          </button>

          <button className="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </div>

        <div
          className={`triangle ${isSpinning ? "spinning" : ""
            } ${showFinalChoices ? "show-final" : ""}`}
        >

          <div className="triangle-content">

            <svg className="triangle-lines" viewBox="0 0 400 350">
              <polygon points="200,20 40,310 360,310" />
            </svg>

            <div className="triangle-top">
              <ChoiceButton choice="rock" onChoice={handlePlayerChoice} />
            </div>

            <div className="triangle-bottom-left">
              <ChoiceButton choice="scissors" onChoice={handlePlayerChoice} />
            </div>

            <div className="triangle-bottom-right">
              <ChoiceButton choice="paper" onChoice={handlePlayerChoice} />
            </div>

          </div>

          <div className="final-choices">

            <ChoiceButton
              choice={playerChoice}
              onChoice={() => { }}
            />

            <div className="versus">VS</div>

            <ChoiceButton
              choice={computerChoice}
              onChoice={() => { }}
            />

          </div>

        </div>

        <Score score={score} />

      </div>

      <GameResult
        playerChoice={playerChoice}
        computerChoice={computerChoice}
        result={result}
      />

    </div>
  )
}

export default App