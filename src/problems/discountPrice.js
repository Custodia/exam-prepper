import { randomIntegerBetween } from '../helpers'

const id = 'discount-price'
const problemTitle = 'Discount price problem'

const getProblem = (rng) => {
  const price = randomIntegerBetween(rng)(20, 40) * 10

  let discountPercentage, discount, discountedPrice
  do {
    discountPercentage = randomIntegerBetween(rng)(100, 400) / 1000
    discount = price * discountPercentage
    discountedPrice = price - discount
  } while (discount !== Math.round(discount))

  const problemStatement = `The normal price of a product is ${price} €. A discount of ${discountPercentage * 100} % is given. What is the discounted price?`
  const isAnswerCorrect = (answer) => parseInt(answer) === discountedPrice

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
