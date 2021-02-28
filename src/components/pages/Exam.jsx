import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import seedrandom from 'seedrandom'

import Timer from './Timer'
import QuestionForm from './QuestionForm'

import {
  fixedCosts,
  customsInspection,
  employeeCount,
  workerCount
} from '../../problems'

import { INITIALIZE_EXAM, SET_EXAM_ANSWERS, SUBMIT_EXAM } from '../../reducers/exam'

import './Exam.css'

const EXAM_PROBLEMS = [
  fixedCosts,
  customsInspection,
  employeeCount,
  workerCount
]

export class ExamPage extends PureComponent {
  state = {
    answers: {},
    touched: {}
  }

  componentDidMount() {
    this.setAllTouched(this.props.initialAnswers)
    if (!this.props.seed)
      this.props.initializeExam()
  }

  componentWillUnmount() {
    this.props.setExamAnswers(this.state.answers)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.allAnswersCorrect() && !this.props.endTime)
      this.props.submitExam()
  }

  allAnswersCorrect = () => {
    const { seed } = this.props
    const rng = seedrandom(seed)

    return this.getSeededExamQuestions(rng).reduce((acc, problem) => {
      const answer = this.state.answers[problem.id]
      const touched = this.state.touched[problem.id]
      const answerIsCorrect = problem.isAnswerCorrect(answer)

      return acc && !!answer && answerIsCorrect && touched
    }, true)
  }

  formSubmitted = (e) => {
    this.setAllTouched()
    e.preventDefault()
  }

  setAllTouched = (answers = this.state.answers) => {
    let newTouched = { ...this.state.touched }

    Object.entries(answers).forEach(([k, v]) => {
      if (!!v) newTouched[k] = true
    })

    this.setState({ answers: answers, touched: newTouched })
  }

  setTouched = (problemId, touched) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [problemId]: touched
      }
    })
  }

  setValue = (problemId, value) => {
    this.setState({
      answers: {
        ...this.state.answers,
        [problemId]: value
      }
    })
  }

  generateNewExam = () => {
    const response = this.allAnswersCorrect() || window.confirm('Are you sure you want to start a new exam from scratch?')

    if (response) {
      this.props.initializeExam()
      this.setState({ answers: {}, touched: {} })
    }
  }

  getSeededExamQuestions = (rng) => {
    return EXAM_PROBLEMS.map(problem => {
      const { id, problemTitle, getProblem } = problem
      const { problemStatement, isAnswerCorrect } = getProblem(rng)

      return {
        id,
        problemTitle,
        getProblem,
        problemStatement,
        isAnswerCorrect
      }
    })
  }

  render() {
    const { seed, startTime, endTime } = this.props

    if (!seed)
      return null

    const rng = seedrandom(seed)
    const seededProblems = this.getSeededExamQuestions(rng)

    return (
      <div id="exam-page">
        <Timer
          startTime={startTime}
          endTime={endTime}
        />
        <Form noValidate onSubmit={this.formSubmitted}>
          {
            seededProblems.map((seededProblem, i) =>
              <QuestionForm
                seededProblem={seededProblem}
                answer={this.state.answers[seededProblem.id] || ''}
                fieldTouched={this.state.touched[seededProblem.id]}
                setTouched={this.setTouched}
                setValue={this.setValue}
                key={seededProblem.id}
                index={i + 1}
              />
            )
          }
          <Button className="m-3" variant="primary" type="submit">
            Submit
          </Button>
          <Button className="mr-3 my-3" variant="secondary" onClick={this.generateNewExam}>
            New Exam
          </Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  seed: state.exam.seed,
  startTime: state.exam.startTime,
  endTime: state.exam.endTime,
  initialAnswers: state.exam.answers
})

const mapDispatchToProps = {
  initializeExam: () => ({ type: INITIALIZE_EXAM }),
  setExamAnswers: answers => ({ type: SET_EXAM_ANSWERS, answers }),
  submitExam: endTime => ({ type: SUBMIT_EXAM, endTime })
}

const WrappedExamPage = connect(mapStateToProps, mapDispatchToProps)(ExamPage)

export default WrappedExamPage
