import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik'

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
    answers: {}
  }

  componentWillUnmount() {
    this.props.setExamAnswers(this.state.answers)
  }

  render() {
    const { seed, initialAnswers } = this.props
    const rng = seedrandom(seed)
    const initialValues = Object.fromEntries(EXAM_PROBLEMS.map(e => [e.id, initialAnswers[e.id] || '']))
    const initialTouched = Object.fromEntries(Object.entries(initialAnswers).map(([k, e]) => [k, !!e]))

    const questionFormGroups = EXAM_PROBLEMS.map(problem => {
      return props => (
        <QuestionForm
          problem={problem}
          key={problem.id}
          {...props}
        />
      )
    })

    return (
      <div id="exam-page">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          initialTouched={initialTouched}
          onSubmit={(values, { setTouched }) => {
            const fieldsToTouch = Object.fromEntries(Object.entries(values).map(([k, e]) => [k, !!e]))
            setTouched(fieldsToTouch)
          }}
        >
          {(props) => (
            <Form noValidate onSubmit={props.handleSubmit}>
              {
                questionFormGroups.map((c, i) =>
                  c({
                    rng: seedrandom(rng()),
                    index: i + 1,
                    ...props,
                    setFieldValue: (field, value) => {
                      props.setFieldValue(field, value)
                      this.setState({ answers: { ...this.state.answers, [field]: value } })
                    }
                  }))
              }
              <Button className="m-3" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
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
