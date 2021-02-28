import {
  Redirect,
  Switch,
  Route
} from 'react-router-dom'

import {
  fixedCosts,
  customsInspectionNeither,
  employeeCount,
  workerCount
} from '../../problems'

import AllQuestions from '../AllQuestions'
import ProblemCard from '../ProblemCard'

function Problems() {
  return (
    <Switch>
      <Route exact path="/problems/">
        <AllQuestions />
      </Route>
      <Route exact path="/problems/employee-count">
        <ProblemCard problem={employeeCount} />
      </Route>
      <Route exact path="/problems/worker-count">
        <ProblemCard problem={workerCount} />
      </Route>
      <Route exact path="/problems/fixed-costs">
        <ProblemCard problem={fixedCosts} />
      </Route>
      <Route exact path="/problems/customs-inspection-neither">
        <ProblemCard problem={customsInspectionNeither} />
      </Route>
      <Redirect from="/" to="/problems" />
    </Switch>
  )
}

export default Problems;
