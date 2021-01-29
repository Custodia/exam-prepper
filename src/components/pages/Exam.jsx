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

import './Exam.css'

const EXAM_PROBLEMS = [
  fixedCosts,
  customsInspection,
  employeeCount,
  workerCount
]

export class ExamPage extends PureComponent {
  render() {
    const rng = seedrandom(this.props.seed)
    const initialValues = Object.fromEntries(EXAM_PROBLEMS.map(e => [e.id, '']))

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
          onSubmit={(values, { setTouched }) => {
            const fieldsToTouch = Object.fromEntries(Object.entries(values).map(([k, e]) => [k, !!e]))
            setTouched(fieldsToTouch)
          }}
        >
          {(props) => (
            <Form noValidate onSubmit={props.handleSubmit}>
              {questionFormGroups.map((c, i) => c({ rng: seedrandom(rng()), index: i + 1, ...props }))}
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
  seed: state.exam.seed
})

export default connect(mapStateToProps)(ExamPage)
