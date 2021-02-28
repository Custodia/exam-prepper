import ProblemCard from './ProblemCard'

import {
  fixedCosts,
  customsInspectionNeither,
  employeeCount,
  workerCount
} from '../problems'

import './AllQuestions.css'

function AllQuestions() {
  return (
    <div className="problem-container" >
      <ProblemCard problem={employeeCount} />
      <ProblemCard problem={workerCount} />
      <ProblemCard problem={fixedCosts} />
      <ProblemCard problem={customsInspectionNeither} />
    </div>
  )
}

export default AllQuestions;
