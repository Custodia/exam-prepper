import BigNumber from "bignumber.js"
import { randomIntegerBetween, selectRandomArrayElement } from '../helpers'

const id = 'percentage-change-problem'
const problemTitle = 'Percentage change problem'

const PROBLEM_STATEMENTS = [
  e => `On a particular day, a power company makes several changes in the power allocated to a neighborhood. First, it increases the power by ${e[0]} percent. Then, it decreases the power by ${e[1]} percent. Finally it increases the power by ${e[2]} percent. What is the net percent ${e[3]} in this neighborhood's power allocation, to the nearest tenth of a percent?`,
  e => `In 2021 gamestop has had a crazy few months. During January GME (gamestop stocks) went up by ${e[0]} percent, by February they went down by ${e[1]} percent but they finally rose on March by an additional ${e[2]} percent. Marcus invested his whole portfolio into GME in the beginning of January. How much would Marcus' portfolios value ${e[3]} if they sold their whole position at the end of March?`
]

const getProblem = rng => {
  const one = new BigNumber(1)

  let percent1String, percent2String, percent3String
  let percent1, percent2, percent3
  let result

  do {
    percent1String = randomIntegerBetween(rng)(1, 9) * 10
    percent2String = randomIntegerBetween(rng)(1, 9) * 10
    percent3String = randomIntegerBetween(rng)(1, 9) * 10

    percent1 = one.plus((new BigNumber(percent1String)).dividedBy(100))
    percent2 = one.minus((new BigNumber(percent2String)).dividedBy(100))
    percent3 = one.plus((new BigNumber(percent3String)).dividedBy(100))

    result = percent1.times(percent2).times(percent3)
  } while (result.isEqualTo(one))

  let correctAnswer, changeString
  if (result.isGreaterThan(one)) {
    correctAnswer = result.minus(one).toFixed(3)
    changeString = 'increase'
  } else {
    correctAnswer = one.minus(result).toFixed(3)
    changeString = 'decrease'
  }

  const problemStatementFunc = selectRandomArrayElement(rng)(PROBLEM_STATEMENTS)
  const problemStatement = problemStatementFunc([percent1String, percent2String, percent3String, changeString])

  const isAnswerCorrect = (answer) =>
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
