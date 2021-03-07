import { randomIntegerBetween, compareToPercentageString } from '../helpers'

const id = 'discount-percentage'
const problemTitle = 'Discount percentage problem'

const getProblem = (rng) => {
  const price = randomIntegerBetween(rng)(20, 40) * 10

  let discountPercentage, discount
  do {
    discountPercentage = randomIntegerBetween(rng)(100, 400) / 1000
    discount = price * discountPercentage
  } while (discount !== Math.round(discount))

  const problemStatement = `The normal price of a product is ${price} €. A discount of ${discount} € is given. What is the discount percent?`

  return {
    problemStatement,
    isAnswerCorrect: compareToPercentageString(discountPercentage)
  }
}

export {
  id,
  problemTitle,
  getProblem
}
