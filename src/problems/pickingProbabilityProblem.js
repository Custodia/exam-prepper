import BigNumber from 'bignumber.js'
import { randomIntegerBetween, selectRandomArrayElement } from '../helpers'

const id = 'picking-probability-problem'
const problemTitle = 'Picking probability problem'

const NUMBERS = [
  'zero',
  'one',
  'two',
  'three',
  'four'
]

const companyEmployeesProblemStatement = rng => (groupMemberCounts, pickLeft) => {
  const pickName = pickLeft ? 'females' : 'males'
  const seed = rng()
  const groupString = groupMemberCounts.reduce((acc, memberCounts, i) => {
    if (seed > 0.4) {
      return acc + ` In team ${NUMBERS[i + 1]} there are ${memberCounts[0]} females and ${memberCounts[1]} males.`
    } else {
      return acc + ` In team ${NUMBERS[i + 1]} there are ${memberCounts[1]} males and ${memberCounts[0]} females.`
    }
  }, '')
  return `Company's employees work in ${NUMBERS[groupMemberCounts.length]} teams.${groupString} What is the probability that all ${NUMBERS[groupMemberCounts.length]} people chosen are ${pickName}?`
}

const flowerProblemStatement = rng => (groupMemberCounts, pickLeft) => {
  const leftName = selectRandomArrayElement(rng)(['red', 'orange', 'yellow'])
  const rightName = selectRandomArrayElement(rng)(['blue', 'green', 'purple'])
  const pickName = pickLeft ? leftName : rightName
  const seed = rng()
  const groupString = groupMemberCounts.reduce((acc, memberCounts, i) => {
    if (seed > 0.4) {
      return acc + ` In vase ${NUMBERS[i + 1]} there are ${memberCounts[0]} ${leftName} flowers and ${memberCounts[1]} ${rightName} flowers.`
    } else {
      return acc + ` In vase ${NUMBERS[i + 1]} there are ${memberCounts[1]} ${rightName} flowers and ${memberCounts[0]} ${leftName} flowers.`
    }
  }, '')
  return `Elena is picking out flowers blind folded from ${NUMBERS[groupMemberCounts.length]} different vases.${groupString} What is the probability that all the flowers Elena picks are ${pickName}?`
}

const PROBLEM_STATEMENTS = [
  companyEmployeesProblemStatement,
  flowerProblemStatement
]

const getProblem = rng => {
  const groupCount = randomIntegerBetween(rng)(2, 4)

  const groupMemberCounts = Array.apply(null, Array(groupCount)).map(() => [
    randomIntegerBetween(rng)(2, 7),
    randomIntegerBetween(rng)(2, 7)
  ])
  const pickLeft = rng() > 0.4

  let problemStatement = selectRandomArrayElement(rng)(PROBLEM_STATEMENTS)(rng)(groupMemberCounts, pickLeft)
  problemStatement = problemStatement + ' (Round your answer to the closest 2 decimal places)'

  const total = new BigNumber(groupMemberCounts.reduce((acc, [left, right]) => acc * (left + right), 1))
  const pickTotal = new BigNumber(groupMemberCounts.reduce((acc, [left, right]) => pickLeft ? acc * left : acc * right, 1))

  const correctAnswer = pickTotal.dividedBy(total).toFixed(4)
  const isAnswerCorrect = answer =>
    [correctAnswer.toString(), (new BigNumber(correctAnswer)).times(100).toString(), `${(new BigNumber(correctAnswer)).times(100).toString()}%`].includes(answer)

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
