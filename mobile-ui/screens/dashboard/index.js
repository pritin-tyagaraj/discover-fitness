import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthSession } from 'expo'
import config from '../../config'

export default class Dashboard extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Tjena</Text>
        <Button
          title='Login with Facebook'
          onPress={this.login}
        />
        <Button
          title='Go to another page'
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      </View>
    )
  }

  async login () {
    // Get accessToken from Facebook
    let redirectUrl = AuthSession.getRedirectUrl()
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${config.facebookAppId}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&scope=public_profile,email`
    })
    const {
      params: {
        access_token: accessToken
      }
    } = result

    // Try to log into (or register if first time user) our backend with the accessToken.
    console.log('ACCESS TOKEN!!', accessToken)
    fetch('https://discover-fitness-dev.herokuapp.com/session', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessToken
      })
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
