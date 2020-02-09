import { DataActionTypes } from './data.types'
import { addNewDailyWeight } from '../utils'

const INITIAL_STATE = {
  height: '',
  weight: '',
  age: '',
  sex: '',
  lifeActivity: 1,
  fat: '',
  weightGoal: '',
  finish: '',
  start: '',
  dailyWeightArray: [],
  userId: '',
  formula: ''
}

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataActionTypes.SET_USER_DATA:
      console.log(action.payload)
      return {
        ...state,
        height: action.payload.height,
        weight: action.payload.weight,
        age: action.payload.age,
        sex: action.payload.sex,
        lifeActivity: action.payload.lifeActivity,
        fat: action.payload.fat
      }
    case DataActionTypes.SET_FAT_DATA:
      return {
        ...state,
        fat: action.payload.fat
      }
    case DataActionTypes.SET_WEIGHT_DATA:
      return {
        ...state,
        weight: action.payload.weight,
        weightGoal: action.payload.weightGoal
      }
    case DataActionTypes.SET_FINISH_DATE:
      return {
        ...state,
        finish: action.payload.finish,
        start: action.payload.start
      }
    case DataActionTypes.SET_DAILY_WEIGHT:
      return {
        ...state,
        dailyWeightArray: addNewDailyWeight(state.dailyWeightArray, action.payload)
      }
    case DataActionTypes.CLEAR_ACTUAL_GOAL:
      return {
        ...state,
        start: action.payload.start,
        finish: action.payload.finish,
        weightGoal: action.payload.weightGoal,
        dailyWeightArray: action.payload.dailyWeightArray
      }
    case DataActionTypes.CLEAR_ACTUAL_GOAL_SAVE_WEIGHTS:
      return {
        ...state,
        start: action.payload.start,
        finish: action.payload.finish,
        weightGoal: action.payload.weightGoal
      }
    case DataActionTypes.CLEAR_FINISH_DATE_ONLY:
      return {
        ...state,
        finish: action.payload.finish
      }
    case DataActionTypes.SET_FORMULA:
      return {
        ...state,
        formula: action.payload.formula
      }
    default:
      return state
  }
}

export default dataReducer