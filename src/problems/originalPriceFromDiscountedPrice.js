import BigNumber from 'bignumber.js'
import { randomIntegerBetween, selectRandomArrayElement } from '../helpers'

const id = 'original-price-from-discounted-price'
const problemTitle = 'Original price from discounted price problem'

const getProblem = (rng) => {
  const price = randomIntegerBetween(rng)(20, 120) * 5
  const centReduction = selectRandomArrayElement(rng)([0, 0.01, 0.05, 0.1, 0.25, 1])
  const originalPrice = new BigNumber(price - centReduction)

  const discountPercent = new BigNumber(randomIntegerBetween(rng)(7, 27))
  const discountMultiplier = (new BigNumber(1).minus(discountPercent.dividedBy(100)))
  const discountedPrice = originalPrice.times(discountMultiplier)

  const problemStatement = `The discounted price of a product is ${discountedPrice.toFixed(2)} € when the discount rate is ${discountPercent.toString()} %. What was the original price of the product? (Give your answer rounded to the closest 5 cents)`
  const isAnswerCorrect = (answer) => answer === originalPrice.toString()

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
