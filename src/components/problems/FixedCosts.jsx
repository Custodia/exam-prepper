import MathQuestion from '../MathQuestion'

const MIN_SALES_REVENUE = 100000
const MAX_SALES_REVENUE = 400000
const MIN_FIXED_COST_PERCENTAGE = 16
const MAX_FIXED_COST_PERCENTAGE = 40

const randomIntegerBetween = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1))
}

const FixedCostsProblem = () => {
  const salesRevenue = randomIntegerBetween(MIN_SALES_REVENUE / 20000, MAX_SALES_REVENUE / 20000) * 20000
  const fixedCostPercentage = randomIntegerBetween(
    MIN_FIXED_COST_PERCENTAGE,
    MAX_FIXED_COST_PERCENTAGE
  )
  const fixedCosts = salesRevenue * (fixedCostPercentage / 100)
  let fixedCostsString = `${fixedCosts}`
  fixedCostsString = fixedCostsString.substring(0, fixedCostsString.length - 3) + ' ' + fixedCostsString.substring(fixedCostsString.length - 3)

  const problemTitle = 'Fixed costs problem'
  const problemStatement = `The fixed costs of a company are ${fixedCostsString} €. The proportion of fixed costs of the sales revenue is ${fixedCostPercentage} %.\nCalculate the sales revenue.`
  const isAnswerCorrect = (answer) => parseInt(answer) === salesRevenue

  return (
    <MathQuestion
      problemTitle={problemTitle}
      problemStatement={problemStatement}
      isAnswerCorrect={isAnswerCorrect}
    />
  )
}

export default FixedCostsProblem
