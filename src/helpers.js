import BigNumber from 'bignumber.js'

export const selectRandomArrayElement = rng => array => {
  const index = Math.floor(rng() * (array.length))
  return array[index]
}

export const selectDistinctRandomElements = rng => (array, count) => {
  let remainingValues = [...array]
  let result = []

  while (result.length < count) {
    const index = Math.floor(rng() * (remainingValues.length))
    const [value] = remainingValues.splice(index, 1)
    result.push(value)
  }

  return result
}

export const randomIntegerBetween = rng => (min, max) => {
  return min + Math.floor(rng() * (max - min + 1))
}

export const compareToPercentageString = percentage => percentageString =>
  `${new BigNumber(percentage).times(100)}%` === percentageString
