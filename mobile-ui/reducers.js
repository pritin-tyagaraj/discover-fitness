import { combineReducers } from 'redux'
import dashboardReducers from './screens/dashboard/reducer'

const rootReducer = combineReducers({
  app: dashboardReducers
})

export default rootReducer
