import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default class GroupsList extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Groups List</Text>
        <Button
          title='Go to another page'
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ee',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
