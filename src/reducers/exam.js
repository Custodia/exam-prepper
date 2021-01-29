export const INITIAL_STATE = {
  seed: Math.random()
}

export const SET_EXAM_SEED = 'SET_EXAM_SEED'

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_EXAM_SEED:
      return { ...state, seed: action.seed }

    default:
      return state
  }
}
