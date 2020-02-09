import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import { AsyncStorage } from 'react-native'

import dataReducer from './data/data.reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['data']
}

const rootReducer = combineReducers({
  data: dataReducer,
})

export default persistReducer(persistConfig, rootReducer)