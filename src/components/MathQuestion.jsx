import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Formik } from 'formik'

const QuestionForm = ({
  isAnswerCorrect,
  handleSubmit,
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  )
}

const MathQuestion = ({ problemTitle, problemStatement, isAnswerCorrect }) => {
  return (
    <Card style={{ width: '25rem' }}>
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
              {...props}
            />
          )}
        </Formik>
      </Card.Body>
    </Card>
  )
}

export default MathQuestion;
