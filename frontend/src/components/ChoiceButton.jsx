function ChoiceButton({ choice, onChoice }) {
  return (
    <button onClick={() => onChoice(choice)}>
      {choice}
    </button>
  )
}

export default ChoiceButton