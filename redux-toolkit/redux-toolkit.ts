import {
  createSlice,
  configureStore,
  PayloadAction,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { addNewDailyWeight } from './utils';

export interface UserDataInterface {
  height: string;
  weight: string;
  age: string;
  sex: string;
  lifeActivity: number;
  fat: string;
  weightGoal: string;
  finish: string;
  start: string;
  dailyWeightArray: any[];
  userId: any;
  formula: string;
}

const dataInitialState: UserDataInterface = {
  height: '',
  weight: '',
  age: '',
  sex: 'Male',
  lifeActivity: 1,
  fat: '',
  weightGoal: '',
  finish: '',
  start: '',
  dailyWeightArray: [],
  userId: '',
  formula: ''
};

// createSlice przyjmuje name, initialState i obiekt z reducerami i tworzy
// action creators, action types i state
const userDataSlice = createSlice({
  name: 'userData',
  initialState: dataInitialState,
  reducers: {
    setData: (
      state: UserDataInterface,
      {
        payload
      }: PayloadAction<{
        height: string;
        weight: string;
        age: string;
        fat: string;
        sex: string;
        lifeActivity: number;
      }>
    ) => {
      state.height = payload.height;
      state.weight = payload.weight;
      state.age = payload.age;
      state.fat = payload.fat;
      state.sex = payload.sex;
      state.lifeActivity = payload.lifeActivity;
    },
    setFatData: (
      state: UserDataInterface,
      { payload }: PayloadAction<{ fat: string }>
    ) => {
      state.fat = payload.fat;
    },
    setWeightData: (
      state: UserDataInterface,
      { payload }: PayloadAction<{ weight: string; weightGoal: string }>
    ) => {
      state.weight = payload.weight;
      state.weightGoal = payload.weightGoal;
    },
    setFinishDate: (
      state: UserDataInterface,
      { payload }: PayloadAction<{ finish: string; start: string }>
    ) => {
      state.finish = payload.finish;
      state.start = payload.start;
    },
    setDailyWeight: (
      state: UserDataInterface,
      { payload }: PayloadAction<{ dailyWeightArray: any[] }>
    ) => {
      state.dailyWeightArray = addNewDailyWeight(
        state.dailyWeightArray,
        payload
      );
    },
    clearActualGoal: (
      state: UserDataInterface,
      {
        payload
      }: PayloadAction<{
        finish: string;
        start: string;
        weightGoal: string;
        dailyWeightArray: any[];
      }>
    ) => {
      state.finish = payload.finish;
      state.start = payload.start;
      state.weightGoal = payload.weightGoal;
      state.dailyWeightArray = payload.dailyWeightArray;
    },
    clearActualGoalSaveWeights: (
      state: UserDataInterface,
      {
        payload
      }: PayloadAction<{ finish: string; start: string; weightGoal: string }>
    ) => {
      state.finish = payload.finish;
      state.start = payload.start;
      state.weightGoal = payload.weightGoal;
    },
    clearFinishDateOnly: (
      state: UserDataInterface,
      { payload }: PayloadAction<{ finish: string }>
    ) => {
      state.finish = payload.finish;
    },
    setFormula: (
      state: UserDataInterface,
      { payload }: PayloadAction<{ formula: string }>
    ) => {
      state.formula = payload.formula;
    }
  }
});

// Nie możemy wprost eksportować akcji jak w przypadku klasycznego reduxa
// Musimy zrobić destrukturyzację poszczególnych reducerów i wyciągnąć z nich actions
export const {
  setData: setDataActionCreator,
  setFatData: setFatDataActionCreator,
  setWeightData: setWeightDataActionCreator,
  setFinishDate: setFinishDateActionCreator,
  setDailyWeight: setDailyWeightActionCreator,
  clearActualGoal: clearActualGoalActionCreator,
  clearActualGoalSaveWeights: clearActualGoalSaveWeightsActionCreator,
  clearFinishDateOnly: clearFinishDateOnlyActionCreator,
  setFormula: setFormulaActionCreator
} = userDataSlice.actions;

const reducer = {
  data: userDataSlice.reducer
};

const middleware = [...getDefaultMiddleware(), logger];
// redux-toolkit dołącza thunk
export default configureStore({
  reducer,
  middleware
});
