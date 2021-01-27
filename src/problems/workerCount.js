export const problemTitle = "Worker count problem"

const SMALL_PRIMES = [3, 5, 7]
const LARGE_PRIMES = [9, 11, 13, 17]

const randomElement = rng => (array) =>
      array[Math.floor(rng() * Math.floor(array.length))]

export const getProblem = (rng) => {
  const randomElementFunc = randomElement(rng)
  const selectedPrimes = [randomElementFunc(SMALL_PRIMES), randomElementFunc(SMALL_PRIMES), randomElementFunc(LARGE_PRIMES)]
  const totalTime = selectedPrimes.reduce((acc, prime) => acc * prime, 1)

  const originalWorkers = randomElementFunc(selectedPrimes)
  let solutionWorkers = originalWorkers
  while (solutionWorkers === originalWorkers) {
    solutionWorkers = randomElementFunc(selectedPrimes)
  }
  const originalTime = totalTime / originalWorkers
  const problemTime = totalTime / solutionWorkers

  const problemStatement = `It will take ${originalTime} working days for ${originalWorkers} workers to finish a job. How many workers would be needed if the
work had to be done in ${problemTime} working days?`
  const isAnswerCorrect = (answer) => parseInt(answer) === solutionWorkers

  return {
    problemStatement,
    isAnswerCorrect
  }
}
