export const INITIAL_STATE = {
  seed: Math.random(),
  answers: {}
}

export const SET_EXAM_SEED = 'SET_EXAM_SEED'
export const SET_EXAM_ANSWERS = 'SET_EXAM_ANSWERS'

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_EXAM_SEED:
      return { ...state, seed: action.seed }

    case SET_EXAM_ANSWERS:
      return {
        ...state,
        answers: {
          ...state.answers,
          ...action.answers
        }
      }

    default:
      return state
  }
}
