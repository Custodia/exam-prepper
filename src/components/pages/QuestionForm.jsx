import { useState } from 'react'
import Form from 'react-bootstrap/Form'

const QuestionForm = ({
  answer,
  fieldTouched,
  setValue,
  setTouched,
  problem,
  rng,
  index
}) => {
  const { id: problemId, problemTitle, getProblem } = problem
  const [ seededProblem ] = useState(getProblem(rng))
  const { problemStatement, isAnswerCorrect } = seededProblem
  const answerIsCorrect = isAnswerCorrect(answer)

  return (
    <Form.Group className="m-3">
      <Form.Label>{index}. {problemTitle}</Form.Label>
      <Form.Text>{problemStatement}</Form.Text>
      <Form.Control
        className="my-2"
        autoComplete="off"
        type="text"
        name={problemId}
        value={answer}
        onChange={event => {
          setTouched(problemId, false)
          setValue(problemId, event.target.value)
        }}
        isInvalid={fieldTouched && !answerIsCorrect}
        isValid={fieldTouched && answerIsCorrect}
        readOnly={fieldTouched && answerIsCorrect}
        placeholder=""
        onFocus={event => {
          if (event.target.autocomplete)
            event.target.autocomplete = 'off'
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setTouched(problemId, true)
          }
        }}
      />
      <Form.Control.Feedback type="invalid">
        {fieldTouched && answerIsCorrect ? null : 'Incorrect answer'}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default QuestionForm
