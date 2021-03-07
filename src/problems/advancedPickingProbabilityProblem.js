import BigNumber from 'bignumber.js'
import { randomIntegerBetween, selectRandomArrayElement } from '../helpers'

const id = 'advanced-picking-probability-problem'
const problemTitle = 'Picking probability problem'

const NUMBERS = [
  'zero',
  'one',
  'two',
  'three',
  'four'
]

const companyEmployeesProblemStatement = rng => (groupMemberCounts) => {
  const groupString = groupMemberCounts.reduce((acc, memberCounts, i) => {
    return acc + ` In team ${NUMBERS[i + 1]} there are ${memberCounts[0]} women and ${memberCounts[1]} men.`
  }, '')
  return `Company's employees work in ${NUMBERS[groupMemberCounts.length]} teams.${groupString} What is the probability that the people chosen are both either men or women?`
}

const flowerProblemStatement = rng => (groupMemberCounts) => {
  const leftName = selectRandomArrayElement(rng)(['red', 'orange', 'yellow'])
  const rightName = selectRandomArrayElement(rng)(['blue', 'green', 'purple'])
  const groupString = groupMemberCounts.reduce((acc, memberCounts, i) => {
    return acc + ` In vase ${NUMBERS[i + 1]} there are ${memberCounts[0]} ${leftName} flowers and ${memberCounts[1]} ${rightName} flowers.`
  }, '')
  return `Elena is picking out flowers blind folded from ${NUMBERS[groupMemberCounts.length]} different vases.${groupString} What is the probability that the flowers Elena picks are either both ${leftName} or ${rightName}?`
}

const PROBLEM_STATEMENTS = [
  companyEmployeesProblemStatement,
  flowerProblemStatement
]

const getProblem = rng => {
  const groupCount = 2

  const groupMemberCounts = Array.apply(null, Array(groupCount)).map(() => [
    randomIntegerBetween(rng)(2, 7),
    randomIntegerBetween(rng)(2, 7)
  ])

  let problemStatement = selectRandomArrayElement(rng)(PROBLEM_STATEMENTS)(rng)(groupMemberCounts)
  problemStatement = problemStatement + ' (Round your answer to the closest 2 decimal places)'

  const { total, leftTotal, rightTotal } = groupMemberCounts.reduce((acc, [left, right]) => ({
    total: acc.total.times(left + right),
    leftTotal: acc.leftTotal.times(left),
    rightTotal: acc.rightTotal.times(right)
  }), {
    total: new BigNumber(1),
    leftTotal: new BigNumber(1),
    rightTotal: new BigNumber(1)
  })

  const leftChance = leftTotal.dividedBy(total)
  const rightChance = rightTotal.dividedBy(total)
  const correctAnswer = leftChance.plus(rightChance).toFixed(4)
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
