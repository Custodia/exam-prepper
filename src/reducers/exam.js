export const INITIAL_STATE = {
  seed: null,
  startTime: null,
  endTime: null,
  answers: {}
}

export const INITIALIZE_EXAM = 'INITIALIZE_EXAM'
export const SET_EXAM_ANSWERS = 'SET_EXAM_ANSWERS'
export const SUBMIT_EXAM = 'SUBMIT_EXAM'

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INITIALIZE_EXAM:
      return {
        ...state,
        seed: action.seed || Math.random(),
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

    case SUBMIT_EXAM:
      return {
        ...state,
        endTime: action.endTime || Date.now()
      }

    default:
      return state
  }
}
