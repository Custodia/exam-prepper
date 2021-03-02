import BigNumber from "bignumber.js"
import { randomIntegerBetween, selectRandomArrayElement } from '../helpers'

const id = 'currency-exchange-problem'
const problemTitle = 'Currency exchange problem'

const CURRENCY_CODES = ['CNY', 'JPY', 'USD', 'EUR', 'GBP']

const pickCurrencyCodes = rng => {
  let remainingCurrencyCodes = [...CURRENCY_CODES]
  const [ code1 ] = remainingCurrencyCodes.splice(randomIntegerBetween(0, remainingCurrencyCodes.length), 1)
  const [ code2 ] = remainingCurrencyCodes.splice(randomIntegerBetween(0, remainingCurrencyCodes.length), 1)
  const [ code3 ] = remainingCurrencyCodes.splice(randomIntegerBetween(0, remainingCurrencyCodes.length), 1)
  return [code1, code2, code3]
}

const getExchangeRate = rng => {
  const baseRate = selectRandomArrayElement(rng)([1, 2, 3, 10, 100, 200])
  return new BigNumber((baseRate * rng()).toFixed(3))
}

const getMultiplicationProblem = (rng) => (currencyCodes) => {
  const rate1 = getExchangeRate(rng)
  const rate2 = getExchangeRate(rng)

  const rateString1 = `1 ${currencyCodes[0]} = ${rate1} ${currencyCodes[1]}`
  const rateString2 = `1 ${currencyCodes[2]} = ${rate2} ${currencyCodes[0]}`

  const rateStrings = rng() > 0.5 ? [rateString1, rateString2] : [rateString2, rateString1]

  const problemStatement = `The currency exchange rates are: ${rateStrings[0]} and ${rateStrings[1]}. How much is 1 ${currencyCodes[2]} worth in ${currencyCodes[1]}? (Round the answer to closest 4 decimal places)`

  const correctAnswer = rate1.times(rate2).toFixed(4)
  console.log(correctAnswer)
  const isAnswerCorrect = (answer) =>
    answer === correctAnswer.toString()

  return {
    problemStatement,
    isAnswerCorrect
  }
}

const getDivisionProblem = (rng) => (currencyCodes) => {
  const rate1 = getExchangeRate(rng)
  const rate2 = getExchangeRate(rng)

  const rateString1 = `1 ${currencyCodes[0]} = ${rate1} ${currencyCodes[2]}`
  const rateString2 = `1 ${currencyCodes[1]} = ${rate2} ${currencyCodes[2]}`

  const rateStrings = rng() > 0.5 ? [rateString1, rateString2] : [rateString2, rateString1]

  const problemStatement = `The currency exchange rates are: ${rateStrings[0]} and ${rateStrings[1]}. How much is 1 ${currencyCodes[0]} worth in ${currencyCodes[1]}? (Round the answer to closest 4 decimal places)`

  const correctAnswer = rate1.dividedBy(rate2).toFixed(4)
  console.log(correctAnswer)
  const isAnswerCorrect = (answer) =>
    answer === correctAnswer.toString()

  return {
    problemStatement,
    isAnswerCorrect
  }
}

const getProblem = rng => {
  let currencyCodes = pickCurrencyCodes(rng)
  randomIntegerBetween(rng)()
  const problemFunc = selectRandomArrayElement(rng)([getMultiplicationProblem, getDivisionProblem])

  return problemFunc(rng)(currencyCodes)
}

export {
  id,
  problemTitle,
  getProblem
}
