export const INITIAL_STATE = {
  seed: null,
  startTime: null,
  answers: {}
}

export const INITIALIZE_EXAM = 'INITIALIZE_EXAM'
export const SET_EXAM_ANSWERS = 'SET_EXAM_ANSWERS'

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INITIALIZE_EXAM:
      return {
        ...state,
        seed: action.seed,
        startTime: Date.now()
      }

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
