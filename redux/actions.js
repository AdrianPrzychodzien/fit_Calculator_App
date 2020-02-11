import { DataActionTypes } from './data/data.types'
import { CircumActionTypes } from './circum/circum.types'

export const setData = data => ({
  type: DataActionTypes.SET_USER_DATA,
  payload: data
})

export const setFatData = data => ({
  type: DataActionTypes.SET_FAT_DATA,
  payload: data
})

export const setWeightData = data => ({
  type: DataActionTypes.SET_WEIGHT_DATA,
  payload: data
})

export const setFinishDate = data => ({
  type: DataActionTypes.SET_FINISH_DATE,
  payload: data
})

export const setFormula = data => ({
  type: DataActionTypes.SET_FORMULA,
  payload: data
})

export const setDailyWeight = data => ({
  type: DataActionTypes.SET_DAILY_WEIGHT,
  payload: data
})

export const clearActualGoal = data => ({
  type: DataActionTypes.CLEAR_ACTUAL_GOAL,
  payload: data
})

export const clearActualGoalSaveWeights = data => ({
  type: DataActionTypes.CLEAR_ACTUAL_GOAL_SAVE_WEIGHTS,
  payload: data
})

export const clearFinishDateOnly = data => ({
  type: DataActionTypes.CLEAR_FINISH_DATE_ONLY,
  payload: data
})


export const setBodyFatCircum = data => ({
  type: CircumActionTypes.SET_BODY_FAT_CIRCUM,
  payload: data
})

export const setCircumferences = data => ({
  type: CircumActionTypes.SET_CIRCUMFERENCES,
  payload: data
})