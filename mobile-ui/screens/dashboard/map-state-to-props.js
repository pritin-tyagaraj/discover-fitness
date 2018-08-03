import * as selectors from './selectors'

const mapStateToProps = (state) => ({
  user: {
    isLoggedIn: selectors.isUserLoggedIn(state),
    displayName: selectors.getCurrentUserDisplayName(state),
    profilePictureUrl: selectors.getCurrentUserProfilePictureUrl(state)
  }
})

export default mapStateToProps
