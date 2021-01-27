import EmployeeCountProblem from './problems/EmployeeCount';
import WorkerCountProblem from './problems/WorkerCount';
import FixedCostsProblem from './problems/FixedCosts';
import CustomsInspectionProblem from './problems/CustomsInspection';

import './AllQuestions.css'

function AllQuestions() {
  return (
    <div className="problem-container" >
      <EmployeeCountProblem />
      <WorkerCountProblem />
      <FixedCostsProblem />
      <CustomsInspectionProblem />
    </div>
  )
}

export default AllQuestions;
