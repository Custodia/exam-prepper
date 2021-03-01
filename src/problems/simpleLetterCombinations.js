import { selectRandomArrayElement } from '../helpers'

const id = 'simple-letter-combinations'
const problemTitle = 'Letter combinations problem'

const factorial = (number, runningResult = 1) => {
  if (number === 1) {
    return runningResult
  } else {
    return factorial(number - 1, runningResult * number)
  }
}

const getProblem = (rng) => {
  const possibleLengths = [[3, 'three'], [4, 'four'], [5, 'five']]
  const [length, lengthString] = selectRandomArrayElement(rng)(possibleLengths)

  const letters = ['A', 'B', 'C', 'D', 'E'].splice(0, length)
  const lettersString = letters.reduce((acc, e, i) => {
    if (i === 0) {
      return e
    } else if (i < letters.length - 1) {
      return `${acc}, ${e}`
    } else {
      return `${acc} and ${e}`
    }
  })

  const problemStatement = `How many different ${lengthString}-letter combinations can be made with the letters ${lettersString}?`
  const isAnswerCorrect = (answer) => parseInt(answer) === factorial(length)

  return {
    problemStatement,
    isAnswerCorrect
  }
}

export {
  id,
  problemTitle,
  getProblem
}
