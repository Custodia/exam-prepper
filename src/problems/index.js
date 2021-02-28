import * as fixedCosts from './fixedCosts'
import * as customsInspectionNeither from './customsInspectionNeither'
import * as customsInspectionBoth from './customsInspectionBoth'
import * as customsInspectionOne from './customsInspectionOne'
import * as employeeCount from './employeeCount'
import * as workerCount from './workerCount'
import * as discountPercentage from './discountPercentage'
import * as discountPrice from './discountPrice'
import * as overAllDiscount from './overallDiscount'

const ALL_PROBLEMS = [
  fixedCosts,
  customsInspectionNeither,
  customsInspectionBoth,
  customsInspectionOne,
  employeeCount,
  workerCount,
  discountPercentage,
  discountPrice,
  overAllDiscount
]

export {
  fixedCosts,
  customsInspectionNeither,
  customsInspectionBoth,
  customsInspectionOne,
  employeeCount,
  workerCount,
  discountPercentage,
  discountPrice,
  overAllDiscount,
  ALL_PROBLEMS
}
