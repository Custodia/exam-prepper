import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const MathQuestion = () => {
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Body>
        <Card.Title>Question 7.2</Card.Title>
        <Card.Text>In a company, 60% of the employees are female. The number of male employees in the company is 32. How many female workers are there.</Card.Text>
        <Form>
          <Form.Group controlId="">
            <Form.Control type="Answer" placeholder="" />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default MathQuestion;
