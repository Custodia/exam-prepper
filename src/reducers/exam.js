export const INITIAL_STATE = {
  seed: null,
  startTime: null,
  endTime: null,
  answers: {},
  touched: {}
}

export const INITIALIZE_EXAM = 'INITIALIZE_EXAM'
export const SET_EXAM_STATE = 'SET_EXAM_STATE'
export const SUBMIT_EXAM = 'SUBMIT_EXAM'

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INITIALIZE_EXAM:
      return {
        ...state,
        ...INITIAL_STATE,
        seed: action.seed || Math.random(),
        startTime: Date.now()
      }

    case SET_EXAM_STATE:
      return {
        ...state,
        answers: action.answers,
        touched: action.touched
      }

    case SUBMIT_EXAM:
      return {
        ...state,
        endTime: action.endTime || Date.now()
      }

    default:
      return state
  }
}
