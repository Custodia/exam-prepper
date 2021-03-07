import BigNumber from "bignumber.js"
import { selectRandomArrayElement, compareToPercentageString } from '../helpers'

export const id = 'customs-inspection-neither'
export const problemTitle = 'Customs inspection problem'

export const getProblem = (rng) => {
  const customsChanceString = selectRandomArrayElement(rng)([6, 7, 8, 9, 11, 12])
  const customsChance = new BigNumber(customsChanceString).dividedBy(100)
  const inverseCustomsChance = (new BigNumber(1)).minus(customsChance)
  const correctAnswer = inverseCustomsChance.times(inverseCustomsChance)

  const problemStatement = `The probability that a passenger is chosen for customs inspection is ${customsChanceString} %. Emma and Michael go through customs. What is the probability that neither of them is chosen for inspection?`

  return {
    problemStatement,
    isAnswerCorrect: compareToPercentageString(correctAnswer)
  }
}
