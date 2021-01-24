import EmployeeCountProblem from './problems/EmployeeCount';
import WorkerCountProblem from './problems/WorkerCount';

import './AllQuestions.css'

function AllQuestions() {
  return (
    <div className="problem-container" >
      <EmployeeCountProblem />
      <WorkerCountProblem />
    </div>
  )
}

export default AllQuestions;
