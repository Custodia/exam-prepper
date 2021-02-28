export const selectRandomArrayElement = rng => array => {
  const index = Math.floor(rng() * (array.length))
  return array[index]
}

export const randomIntegerBetween = rng => (min, max) => {
  return min + Math.floor(rng() * (max - min + 1))
}
