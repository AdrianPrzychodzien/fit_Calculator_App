import { CircumActionTypes } from './circum.types'
import { addNewMeasurement } from '../utils'

const INITIAL_STATE = {
  waist: '',
  hips: '',
  neck: '',
  circumferences: []
}

const circumReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CircumActionTypes.SET_BODY_FAT_CIRCUM:
      return {
        ...state,
        waist: action.payload.waist,
        hips: action.payload.hips,
        neck: action.payload.neck
      }
    case CircumActionTypes.SET_CIRCUMFERENCES:
      return {
        ...state,
        circumferences: addNewMeasurement(state.circumferences, action.payload)
      }
    default:
      return state
  }
}

export default circumReducer