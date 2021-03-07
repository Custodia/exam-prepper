import BigNumber from "bignumber.js"
import { randomIntegerBetween, compareToPercentageString } from '../helpers'

const id = 'overall-discount'
const problemTitle = 'Overall discount problem'

const getProblem = (rng) => {
  const discount1 = new BigNumber(randomIntegerBetween(rng)(60, 80)).dividedBy(100)
  const discount2 = new BigNumber(randomIntegerBetween(rng)(60, 80)).dividedBy(100)
  const one = new BigNumber(1)
  const overAllDiscount = one.minus(discount1.times(discount2))

  const discount1String = 100 - discount1.times(100).toFixed()
  const discount2String = 100 - discount2.times(100).toFixed()
  const problemStatement = `Calculate the overall discount when the price of a product is first discounted by ${discount1String}% and later it is discounted again by ${discount2String}%`

  return {
    problemStatement,
    isAnswerCorrect: compareToPercentageString(overAllDiscount)
  }
}

export {
  id,
  problemTitle,
  getProblem
}
