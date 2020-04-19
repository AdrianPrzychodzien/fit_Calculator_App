import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addNewMeasurement } from '../utils';
import { CircumInterface } from '../interfaces';

const circumInitialState: CircumInterface = {
  waist: 0,
  hips: 0,
  neck: 0,
  circumferences: []
};

export const circumSlice = createSlice({
  name: 'circum',
  initialState: circumInitialState,
  reducers: {
    setBodyFatCircum: (
      state: CircumInterface,
      {
        payload
      }: PayloadAction<{
        waist: number;
        hips: number;
        neck: number;
      }>
    ) => {
      state.waist = payload.waist;
      state.hips = payload.hips;
      state.neck = payload.neck;
    },
    setCircumferences: (
      state: CircumInterface,
      { payload }: PayloadAction<{ fat: number }>
    ) => {
      state.circumferences = addNewMeasurement(state.circumferences, payload);
    }
  }
});

export const {
  setBodyFatCircum: setBodyFatCircumActionCreator,
  setCircumferences: setCircumferencesActionCreator
} = circumSlice.actions;
