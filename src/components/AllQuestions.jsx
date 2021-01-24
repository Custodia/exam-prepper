import EmployeeCountProblem from './problems/EmployeeCount';
import WorkerCountProblem from './problems/WorkerCount';
import FixedCostsProblem from './problems/FixedCosts';

import './AllQuestions.css'

function AllQuestions() {
  return (
    <div className="problem-container" >
      <EmployeeCountProblem />
      <WorkerCountProblem />
      <FixedCostsProblem />
    </div>
  )
}

export default AllQuestions;
