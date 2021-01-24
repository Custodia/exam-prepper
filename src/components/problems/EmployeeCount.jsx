import MathQuestion from '../MathQuestion'

const MIN_EMPLOYEE_COUNT = 20
const MAX_EMPLOYEE_COUNT = 100
const MIN_PERCENTAGE = 21
const EXCLUDE_PERCENTAGES = [25, 30, 40, 50, 60, 70, 75]

const getRandomEmployeeCount = () =>
  MIN_EMPLOYEE_COUNT + Math.floor(Math.random() * Math.floor(MAX_EMPLOYEE_COUNT - MIN_EMPLOYEE_COUNT + 1))

const getProblemValues = () => {
  let employeeCount, femaleEmployees, maleEmployees, femalePercentage, malePercentage

  while (true) {
    const possibleEmployeeCount = getRandomEmployeeCount()

    const possibleFemaleEmployees =
      [...Array(101 - MIN_PERCENTAGE).keys()]
        .splice(MIN_PERCENTAGE)
        .map(percentage => [percentage, possibleEmployeeCount * ( percentage / 100 )])
        .filter(([percentage, employeeCount]) => Number.isInteger(employeeCount))
        .filter(([percentage, employeeCount]) => !EXCLUDE_PERCENTAGES.includes(percentage))

    if (possibleFemaleEmployees.length === 0)
      continue

    const index = Math.floor(Math.random() * possibleFemaleEmployees.length)
    employeeCount = possibleEmployeeCount
    femaleEmployees = possibleFemaleEmployees[index][1]
    femalePercentage = possibleFemaleEmployees[index][0]
    maleEmployees = employeeCount - femaleEmployees
    malePercentage = 100 - femalePercentage
    break
  }

  return {
    employeeCount,
    femaleEmployees,
    maleEmployees,
    femalePercentage,
    malePercentage
  }
}

const EmployeeCountProblem = () => {
  const {
    femaleEmployees,
    maleEmployees,
    femalePercentage,
  } = getProblemValues()

  const problemTitle = 'Question 7.2'
  const problemStatement = `In a company ${femalePercentage}% of the employees are female. The number of male employees in the company is ${maleEmployees}. How many female workers are there?`
  const isAnswerCorrect = (answer) => parseInt(answer) === femaleEmployees

  return (
    <MathQuestion
      problemTitle={problemTitle}
      problemStatement={problemStatement}
      isAnswerCorrect={isAnswerCorrect}
    />
  )
}

export default EmployeeCountProblem
