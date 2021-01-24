import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Formik } from 'formik'

const MIN_EMPLOYEE_COUNT = 20
const MAX_EMPLOYEE_COUNT = 100
const MIN_PERCENTAGE = 21
const EXCLUDE_PERCENTAGES = [25, 30, 40, 50, 60, 70, 75]

const getRandomEmployeeCount = () =>
  MIN_EMPLOYEE_COUNT + Math.floor(Math.random() * Math.floor(MAX_EMPLOYEE_COUNT - MIN_EMPLOYEE_COUNT + 1))

const getProblemValues = () => {
  let employeeCount, femaleEmployees, maleEmployees, femalePercentage, malePercentage

  while (true) {
    const possibleEmployeeCount = getRandomEmployeeCount()

    const possibleFemaleEmployees =
      [...Array(101 - MIN_PERCENTAGE).keys()]
        .splice(MIN_PERCENTAGE)
        .map(percentage => [percentage, possibleEmployeeCount * ( percentage / 100 )])
        .filter(([percentage, employeeCount]) => Number.isInteger(employeeCount))
        .filter(([percentage, employeeCount]) => !EXCLUDE_PERCENTAGES.includes(percentage))

    if (possibleFemaleEmployees.length === 0)
      continue

    const index = Math.floor(Math.random() * possibleFemaleEmployees.length)
    employeeCount = possibleEmployeeCount
    femaleEmployees = possibleFemaleEmployees[index][1]
    femalePercentage = possibleFemaleEmployees[index][0]
    maleEmployees = employeeCount - femaleEmployees
    malePercentage = 100 - femalePercentage
    break
  }

  return {
    employeeCount,
    femaleEmployees,
    maleEmployees,
    femalePercentage,
    malePercentage
  }
}

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

const MathQuestion = () => {
  const {
    femaleEmployees,
    maleEmployees,
    femalePercentage,
  } = getProblemValues()

  const problemStatement = `In a company, ${femalePercentage}% of the employees are female. The number of male employees in the company is ${maleEmployees}. How many female workers are there?`
  const isAnswerCorrect = (answer) => parseInt(answer) === femaleEmployees

  return (
    <Card style={{ width: '25rem' }}>
      <Card.Body>
        <Card.Title>Question 7.2</Card.Title>
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
