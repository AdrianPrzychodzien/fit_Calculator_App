import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addNewMeasurement } from '../utils';
import { CircumInterface } from '../interfaces';

const circumInitialState: CircumInterface = {
  waist: '',
  hips: '',
  neck: '',
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
        waist: string;
        hips: string;
        neck: string;
      }>
    ) => {
      state.waist = payload.waist;
      state.hips = payload.hips;
      state.neck = payload.neck;
    },
    setCircumferences: (
      state: CircumInterface,
      { payload }: PayloadAction<{ fat: string }>
    ) => {
      state.circumferences = addNewMeasurement(state.circumferences, payload);
    }
  }
});

export const {
  setBodyFatCircum: setBodyFatCircumActionCreator,
  setCircumferences: setCircumferencesActionCreator
} = circumSlice.actions;
