export const isUserLoggedIn = (state) => {
  return state.app.user.isLoggedIn
}

export const getCurrentUserDisplayName = (state) => {
  return state.app.user.firstName
}

export const getCurrentUserProfilePictureUrl = (state) => {
  return state.app.user.profilePictureUrl
}
