import { useState } from 'react'
import ChoiceButton from './components/ChoiceButton'
import GameResult from './components/GameResult'
import Score from './components/Score'
import './App.css'
import pedra from "./assets/pedra.png"
import papel from "./assets/papel.png"
import tesoura from "./assets/tesoura.png"
import lizard from "./assets/lizard.png"
import spock from "./assets/spock.png"

const classicChoices = ["rock", "paper", "scissors"]

const advancedChoices = [
  "rock",
  "paper",
  "scissors",
  "lizard",
  "spock"
]

function getComputerChoice(choices) {
  const randomIndex = Math.floor(Math.random() * choices.length)

  return choices[randomIndex]
}

function determineWinner(player, computer) {
  if (player === computer) {
    return "draw"
  }

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "rock" && computer === "lizard") ||
    (player === "paper" && computer === "rock") ||
    (player === "paper" && computer === "spock") ||
    (player === "scissors" && computer === "paper") ||
    (player === "scissors" && computer === "lizard") ||
    (player === "lizard" && computer === "paper") ||
    (player === "lizard" && computer === "spock") ||
    (player === "spock" && computer === "rock") ||
    (player === "spock" && computer === "scissors")
  ) {
    return "win"
  }

  return "lose"
}

function App() {

  const [showRules, setShowRules] = useState(false)
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

  const [gameMode, setGameMode] = useState("classic")

  const choices = gameMode === "classic"
  ? classicChoices
  : advancedChoices

  function handlePlayerChoice(choice) {
    setIsSpinning(true)

    const computer = getComputerChoice(choices)

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
      <div className="mode-switch">
        <button
          className={gameMode === "classic" ? "active" : ""}
          onClick={() => setGameMode("classic")}
        >
          Classic
        </button>

        <button
          className={gameMode === "advanced" ? "active" : ""}
          onClick={() => setGameMode("advanced")}
        >
          Advanced
        </button>
      </div>
      <br />
      <h2>
        {gameMode === "classic"
          ? "Rock Paper Scissors"
          : "Rock Paper Scissors Lizard Spock"}
      </h2>

      <div className="game-area">
        <div className="game-buttons">

          <button className="reset-button play-again-button" onClick={playAgain}>
            Play Again
          </button>
          <div className="bottom-buttons">
            <button className="reset-button" onClick={resetGame}>
              Reset Game
            </button>
            
            <button
              className="rules-button" 
              onClick={() => setShowRules(true)}
              >
                Rules
            </button>
          </div>
        </div>

        <div
          className={`triangle ${gameMode} ${isSpinning ? "spinning" : ""
            } ${showFinalChoices ? "show-final" : ""}`}
        >

          <div className="triangle-content">

            <svg className="triangle-lines" viewBox="0 0 400 350">
              {gameMode === "classic" ? (
                <polygon points="200,20 380,330 20,330" />
              ) : (
                <polygon points="200,20 380,140 310,330 90,330 20,140" />
              )}
            </svg>

            <div className="triangle-top">
              <ChoiceButton choice="rock" onChoice={handlePlayerChoice} />
            </div>

            <div className="triangle-upper-right">
              <ChoiceButton choice="scissors" onChoice={handlePlayerChoice} />
            </div>

            {gameMode === "advanced" && (
              <>
                <div className="triangle-bottom-right">
                  <ChoiceButton choice="lizard" onChoice={handlePlayerChoice} />
                </div>

                <div className="triangle-bottom-left">
                  <ChoiceButton choice="spock" onChoice={handlePlayerChoice} />
                </div>
              </>
            )}

            <div className="triangle-upper-left">
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

      {showRules && (
        <div className="rules-overlay">
          <div className="rules-modal">
            <button
              className="close-button"
              onClick={() => setShowRules(false)}
            >
              ×
            </button>

            <h2>How to play</h2>

              <p>
                {gameMode === "classic" ? (
                  <>
                    <img src={pedra} alt="Pedra" /> Rock crushes <img src={tesoura} alt="Tesoura" /> Scissors.
                    <br />
                    <img src={papel} alt="Pedra" /> Paper covers <img src={pedra} alt="Pedra" /> Rock.
                    <br />
                    <img src={tesoura} alt="Tesoura" /> Scissors cut <img src={papel} alt="Papel" /> Paper.
                    <br />
                  </>
                ) : (
                  
                  <>
                    <img src={pedra} alt="Pedra" /> Rock crushes <img src={tesoura} alt="Tesoura" /> Scissors and <img src={lizard} alt="Lizard" /> Lizard.
                    <br />

                    <img src={papel} alt="Papel" /> Paper covers <img src={pedra} alt="Pedra" /> Rock and disproves <img src={spock} alt="Spock" /> Spock.
                    <br />

                    <img src={tesoura} alt="Tesoura" /> Scissors cuts <img src={papel} alt="Papel" /> Paper and decapitates <img src={lizard} alt="Lizard" /> Lizard.
                    <br />

                    <img src={lizard} alt="Lizard" /> Lizard eats <img src={papel} alt="Papel" /> Paper and poisons <img src={spock} alt="Spock" /> Spock.
                    <br />

                    <img src={spock} alt="Spock" /> Spock vaporizes <img src={pedra} alt="Pedra" /> Rock and smashes <img src={tesoura} alt="Tesoura" /> Scissors.
                      </>
                    )}
                </p>
          </div>
        </div>
      )}

    </div>
  )
}

export default App