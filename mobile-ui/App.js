import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Dashboard, Profile } from './screens'

const RootStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard
  },
  Profile: {
    screen: Profile
  }
}, {
  initialRouteName: 'Dashboard'
})

export default class App extends React.Component {
  render () {
    return (
      <RootStack />
    )
  }
}
