import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addNewDailyWeight } from "../utils";
import { dailyWeightInterface, UserDataInterface } from "../interfaces";

const dataInitialState: UserDataInterface = {
  height: 0,
  weight: 0,
  age: 0,
  sex: "",
  lifeActivity: 1,
  fat: 0,
  weightGoal: 0,
  finish: "",
  start: "",
  dailyWeightArray: [],
  userId: "",
  formula: ""
};

// createSlice przyjmuje name, initialState i obiekt z reducerami i tworzy
// action creators, action types i state
export const userDataSlice = createSlice({
  name: "userData",
  initialState: dataInitialState,
  reducers: {
    setData: (
      state: UserDataInterface,
      {
        payload
      }: PayloadAction<{
        height: number;
        weight: number;
        age: number;
        fat: number;
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
      { payload }: PayloadAction<{ fat: number }>
    ) => {
      state.fat = payload.fat;
    },
    setWeightData: (
      state: UserDataInterface,
      { payload }: PayloadAction<{ weight: number; weightGoal: number }>
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
      { payload }: PayloadAction<{ date: string; weight: number }>
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
        weightGoal: number;
        dailyWeightArray: dailyWeightInterface[];
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
      }: PayloadAction<{ finish: string; start: string; weightGoal: number }>
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
