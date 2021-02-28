import * as fixedCosts from './fixedCosts'
import * as customsInspection from './customsInspection'
import * as employeeCount from './employeeCount'
import * as workerCount from './workerCount'
import * as discountPercentage from './discountPercentage'
import * as discountPrice from './discountPrice'

const ALL_PROBLEMS = [
  fixedCosts,
  customsInspection,
  employeeCount,
  workerCount,
  discountPercentage,
  discountPrice
]

export {
  fixedCosts,
  customsInspection,
  employeeCount,
  workerCount,
  discountPercentage,
  discountPrice,
  ALL_PROBLEMS
}
