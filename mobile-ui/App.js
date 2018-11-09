import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Dashboard, Profile } from './screens'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers'
import { ready } from './app/actions'

import thunkMiddleware from 'redux-thunk'
import appMiddlewares from './app/midlewares'

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    ...appMiddlewares
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
  componentDidMount () {
    store.dispatch(ready())
  }

  render () {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}
