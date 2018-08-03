import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Dashboard, Profile } from './screens'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
)

const RootStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard
  },
  Profile: {
    screen: Profile
  }
}, {
  initialRouteName: 'Dashboard',
  headerMode: 'none'
})

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}
