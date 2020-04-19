import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { userDataSlice } from './reducers/data.reducer';
import { circumSlice } from './reducers/circum.reducer';

const reducer = {
  data: userDataSlice.reducer,
  circum: circumSlice.reducer
};

const middleware = [...getDefaultMiddleware(), logger];
// redux-toolkit dołącza thunk
export default configureStore({
  reducer,
  middleware
});
