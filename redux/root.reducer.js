import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import { AsyncStorage } from 'react-native'

import dataReducer from './data/data.reducer'
import circumReducer from './circum/circum.reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['data', 'circum']
}

const rootReducer = combineReducers({
  data: dataReducer,
  circum: circumReducer
})

export default persistReducer(persistConfig, rootReducer)