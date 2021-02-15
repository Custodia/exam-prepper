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

import { SET_EXAM_ANSWERS } from '../../reducers/exam'

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

  componentWillMount() {
    this.setAllTouched(this.props.initialAnswers)
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

  render() {
    const { seed } = this.props
    const rng = seedrandom(seed)

    return (
      <div id="exam-page">
        <Form noValidate onSubmit={this.formSubmitted}>
          {
            EXAM_PROBLEMS.map((problem, i) =>
              <QuestionForm
                problem={problem}
                answer={this.state.answers[problem.id] || ''}
                fieldTouched={this.state.touched[problem.id]}
                setTouched={this.setTouched}
                setValue={this.setValue}
                key={problem.id}
                rng={seedrandom(rng())}
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
  initialAnswers: state.exam.answers
})

const mapDispatchToProps = {
  setExamAnswers: answers => ({ type: SET_EXAM_ANSWERS, answers })
}

const WrappedExamPage = connect(mapStateToProps, mapDispatchToProps)(ExamPage)

export default WrappedExamPage
