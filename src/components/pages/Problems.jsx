import {
  Redirect,
  Switch,
  Route
} from 'react-router-dom'

import AllQuestions from '../AllQuestions'
import EmployeeCountProblem from '../problems/EmployeeCount';
import WorkerCountProblem from '../problems/WorkerCount';
import FixedCostsProblem from '../problems/FixedCosts';

function Problems() {
  return (
    <Switch>
      <Route exact path="/problems/">
        <AllQuestions />
      </Route>
      <Route exact path="/problems/employee-count">
        <EmployeeCountProblem />
      </Route>
      <Route exact path="/problems/worker-count">
        <WorkerCountProblem />
      </Route>
      <Route exact path="/problems/fixed-costs">
        <FixedCostsProblem />
      </Route>
      <Redirect from="/" to="/problems" />
    </Switch>
  )
}

export default Problems;
