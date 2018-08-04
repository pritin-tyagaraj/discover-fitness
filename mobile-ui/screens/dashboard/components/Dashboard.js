import React from 'react'
import PropTypes from 'prop-types'
import { Container, H1, Content } from 'native-base'

import Header from './partials/Header'
import Footer from './partials/Footer'

class Dashboard extends React.Component {
  render () {
    const {
      user: {
        isLoggedIn: isUsedLoggedIn,
        displayName: userDisplayName,
        profilePictureUrl: userProfilePictureUrl
      },
      triggerLogin
    } = this.props

    return (
      <Container>
        <Header
          isUserLoggedIn={isUsedLoggedIn}
          triggerLogin={triggerLogin}
          userProfilePictureUrl={userProfilePictureUrl}
        />
        <Content>
          <H1>{userDisplayName}</H1>
        </Content>
        <Footer />
      </Container>
    )
  }
}

Dashboard.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    displayName: PropTypes.string,
    profilePictureUrl: PropTypes.string
  }),
  triggerLogin: PropTypes.func
}

export default Dashboard
