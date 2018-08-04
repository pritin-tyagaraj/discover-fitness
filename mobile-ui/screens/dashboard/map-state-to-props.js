import * as appSelectors from '../../app/selectors'

const mapStateToProps = (state) => ({
  user: {
    isLoggedIn: appSelectors.isUserLoggedIn(state),
    displayName: appSelectors.getCurrentUserDisplayName(state),
    profilePictureUrl: appSelectors.getCurrentUserProfilePictureUrl(state)
  }
})

export default mapStateToProps
