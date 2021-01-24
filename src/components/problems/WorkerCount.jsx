import MathQuestion from '../MathQuestion'

const SMALL_PRIMES = [3, 5, 7]
const LARGE_PRIMES = [9, 11, 13, 17]

const randomElement = (array) =>
  array[Math.floor(Math.random() * Math.floor(array.length))]

const WorkerCountProblem = () => {
  const selectedPrimes = [randomElement(SMALL_PRIMES), randomElement(SMALL_PRIMES), randomElement(LARGE_PRIMES)]
  const totalTime = selectedPrimes.reduce((acc, prime) => acc * prime, 1)

  const originalWorkers = randomElement(selectedPrimes)
  let solutionWorkers = originalWorkers
  while (solutionWorkers === originalWorkers) {
    solutionWorkers = randomElement(selectedPrimes)
  }
  const originalTime = totalTime / originalWorkers
  const problemTime = totalTime / solutionWorkers

  const problemTitle = "Worker count problem"
  const problemStatement = `It will take ${originalTime} working days for ${originalWorkers} workers to finish a job. How many workers would be needed if the
work had to be done in ${problemTime} working days?`
  const isAnswerCorrect = (answer) => parseInt(answer) === solutionWorkers

  return (
    <MathQuestion
      problemTitle={problemTitle}
      problemStatement={problemStatement}
      isAnswerCorrect={isAnswerCorrect}
    />
  )
}

export default WorkerCountProblem
