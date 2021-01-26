import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

import AllQuestions from './components/AllQuestions'
import ProblemsPage from './components/pages/Problems'

function App() {
  return (
    <div className="App" >
      <Router>
        <Switch>
          <Route exact path="/">
            <AllQuestions />
          </Route>
          <Route path="/problems">
            <ProblemsPage />
          </Route>
          <Redirect from="/" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
