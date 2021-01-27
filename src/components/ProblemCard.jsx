import { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Formik } from 'formik'

import seedrandom from 'seedrandom'

const QuestionForm = ({
  isAnswerCorrect,
  handleSubmit,
  onRefresh,
  values,
  touched: { answer: answerTouched },
  isValid,
  errors,
  setFieldTouched,
  setFieldValue
}) => {
  const { answer } = values
  const answerIsCorrect = isAnswerCorrect(answer)

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          autoComplete="off"
          type="text"
          name="answer"
          value={answer}
          onChange={event => {
            setFieldTouched('answer', false)
            setFieldValue('answer', event.target.value)
          }}
          isInvalid={answerTouched && !answerIsCorrect}
          isValid={answerTouched && answerIsCorrect}
          readOnly={answerTouched && answerIsCorrect}
          placeholder=""
          onFocus={event => {
            if (event.target.autocomplete)
              event.target.autocomplete = 'off'
          }}
        />
        <Form.Control.Feedback type="invalid">
          {answerTouched && answerIsCorrect ? null : 'Incorrect answer'}
        </Form.Control.Feedback>
        <br />
        <Button className="m-1" variant="dark" type="submit">
          Submit
        </Button>
        <Button className="m-1" variant="warning" onClick={onRefresh}>
          Refresh
        </Button>
      </Form.Group>
    </Form>
  )
}

export const ProblemCard = ({ seed = Math.random(), problem: { problemTitle, getProblem } }) => {
  const [ currentSeed, setSeed ] = useState(seed)
  const rng = seedrandom(currentSeed)
  const { problemStatement, isAnswerCorrect } = getProblem(rng)

  return (
    <Card className="m-3" >
      <Card.Body>
        <Card.Title>{problemTitle}</Card.Title>
        <Card.Text>{problemStatement}</Card.Text>
        <Formik
          onSubmit={({ answer }, { setFieldTouched }) => {
            if (!!answer)
              setFieldTouched('answer', true)
          }}
          initialValues={{ answer: '' }}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <QuestionForm
              isAnswerCorrect={isAnswerCorrect}
              onRefresh={() => {
                props.setFieldValue('answer', '')
                props.setFieldTouched('answer', false)
                setSeed(rng())
              }}
              {...props}
            />
          )}
        </Formik>
      </Card.Body>
    </Card>
  )
}

export default ProblemCard;
