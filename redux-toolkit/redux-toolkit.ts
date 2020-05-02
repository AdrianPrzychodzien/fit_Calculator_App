import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSecureStore from "redux-persist-expo-securestore";
import logger from "redux-logger";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import { userDataSlice } from "./reducers/data.reducer";
import { circumSlice } from "./reducers/circum.reducer";

const rootReducer = combineReducers({
  data: userDataSlice.reducer,
  circum: circumSlice.reducer
});

const persistConfig = {
  key: "root",
  storage: createSecureStore(),
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleware = [...getDefaultMiddleware(), logger];

// redux-toolkit dołącza thunk
const store = configureStore({
  reducer: persistedReducer,
  middleware: []
});

let persistor = persistStore(store);

export { store, persistor };
