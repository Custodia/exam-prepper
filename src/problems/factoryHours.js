import BigNumber from 'bignumber.js'
import { randomIntegerBetween, selectDistinctRandomElements } from '../helpers'

const id = 'factory-hours'
const problemTitle = "Factory hours problem"

const POSSIBLE_HOURS = [6.5, 7, 7.5, 8]

const getProblem = (rng) => {
  const [originalHours, newHours] = selectDistinctRandomElements(rng)(POSSIBLE_HOURS, 2)
  const baseWorkload = new BigNumber(randomIntegerBetween(rng)(4, 26) * 2)
  const originalWorkers = new BigNumber(baseWorkload * newHours)

  let problemStatement
  if (originalHours > newHours) {
    problemStatement = `A factory has ${originalWorkers} workers. They have decided to change from an ${originalHours}-hour working day into a ${newHours}-hour working day. How many more employees does the company need to hire in order to keep the factory running as before?`
  } else {
    problemStatement = `A factory has ${originalWorkers} workers. To cut costs during the pandemic they have decided to change from an ${originalHours}-hour working day into a ${newHours}-hour working day. How many employees can they furlough while still keeping the same productivity?`
  }

  const newWorkers = (originalWorkers.times(originalHours)).dividedBy(newHours)
  const correctAnswer = Math.abs(originalWorkers.minus(newWorkers).integerValue())

  const isAnswerCorrect = (answer) => parseInt(answer) === correctAnswer

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
