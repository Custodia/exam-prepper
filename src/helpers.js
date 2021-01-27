export const randomIntegerBetween = rng => (min, max) => {
  return min + Math.floor(rng() * (max - min + 1))
}
