import { combineReducers } from 'redux'
import appReducers from './app/reducer'

const rootReducer = combineReducers({
  app: appReducers
})

export default rootReducer
