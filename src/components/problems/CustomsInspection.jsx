import MathQuestion from '../MathQuestion'

const CustomsInspection = () => {
  const customsChance = [5, 10][Math.floor(Math.random() * 2)] / 100
  const correctAnswer = (1 - customsChance) * (1 - customsChance)

  const problemTitle = 'Customs inspection problem'
  const problemStatement = `The probability that a passenger is chosen for customs inspection is ${customsChance * 100} %. Emma and Michael go through customs. What is the probability that neither of them is chosen for inspection?`
  const isAnswerCorrect = (answer) => [`${correctAnswer}`, `${correctAnswer * 100}`, `${correctAnswer * 100}%`].includes(answer)

  return (
    <MathQuestion
      problemTitle={problemTitle}
      problemStatement={problemStatement}
      isAnswerCorrect={isAnswerCorrect}
    />
  )
}

export default CustomsInspection
