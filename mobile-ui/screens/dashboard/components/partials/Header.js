import React from 'react'
import PropTypes from 'prop-types'
import { Body, Header, Button, Icon, Thumbnail, Title, Left, Right } from 'native-base'

const DashboardHeader = (props) => {
  const {
    isUserLoggedIn,
    triggerLogin,
    userProfilePictureUrl
  } = props

  return (
    <Header>
      <Left />
      <Body>
        <Title>Dashboard</Title>
      </Body>
      <Right>
        {!isUserLoggedIn && (
          <Button
            transparent
            onPress={triggerLogin}>
            <Icon ios='ios-log-in' android="md-log-in" name="log-in" />
          </Button>
        )}
        {isUserLoggedIn && (
          <Button iconRight light>
            <Thumbnail small source={{ uri: userProfilePictureUrl }} />
          </Button>
        )}
      </Right>
    </Header>
  )
}

DashboardHeader.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  userDisplayName: PropTypes.string,
  userProfilePictureUrl: PropTypes.string,
  triggerLogin: PropTypes.func
}

DashboardHeader.defaultProps = {
  user: {
    isLoggedIn: false
  }
}

export default DashboardHeader
