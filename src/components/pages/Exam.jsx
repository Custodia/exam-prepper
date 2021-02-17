import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import seedrandom from 'seedrandom'

import QuestionForm from './QuestionForm'

import {
  fixedCosts,
  customsInspection,
  employeeCount,
  workerCount
} from '../../problems'

import { INITIALIZE_EXAM, SET_EXAM_ANSWERS } from '../../reducers/exam'

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
    touched: {},
    startTime: null
  }

  componentWillMount() {
    this.setAllTouched(this.props.initialAnswers)
    if (!this.props.seed)
      this.props.initializeExam()
  }

  componentWillUnmount() {
    this.props.setExamAnswers(this.state.answers)
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
    const { seed, startTime } = this.props

    if (!!seed)
      return null

    const rng = seedrandom(seed)
    const seededProblems = this.getSeededExamQuestions(rng)

    return (
      <div id="exam-page">
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
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  seed: state.exam.seed,
  startTime: state.exam.startTime,
  initialAnswers: state.exam.answers
})

const mapDispatchToProps = {
  initializeExam: () => ({ type: INITIALIZE_EXAM }),
  setExamAnswers: answers => ({ type: SET_EXAM_ANSWERS, answers })
}

const WrappedExamPage = connect(mapStateToProps, mapDispatchToProps)(ExamPage)

export default WrappedExamPage
