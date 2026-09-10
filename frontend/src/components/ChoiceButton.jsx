import pedra from "../assets/pedra.png"
import papel from "../assets/papel.png"
import tesoura from "../assets/tesoura.png"
import lizard from "../assets/lizard.png"
import spock from "../assets/spock.png"

function ChoiceButton({ choice, onChoice }) {

  const images = {
    rock: pedra,
    paper: papel,
    scissors: tesoura,
    lizard: lizard,
    spock: spock
  }

  return (
    <button
      className="choice-button"
      onClick={() => onChoice(choice)}
    >
      <img
        className="choice-image"
        src={images[choice]}
        alt={choice}
      />
    </button>
  )
}

export default ChoiceButton