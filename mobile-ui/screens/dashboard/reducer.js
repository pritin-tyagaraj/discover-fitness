import {
  START_LOGIN,
  HANDLE_LOGIN_RESPONSE
} from './actions'

const initialState = {
  user: {
    isLoggingIn: false,
    isLoggedIn: false,
    firstName: '',
    lastName: ''
  }
}

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        user: {
          ...state.app,
          isLoggingIn: true
        }
      }

    case HANDLE_LOGIN_RESPONSE:
      const success = !!action.payload.success
      return {
        ...state,
        user: {
          ...state.user,
          isLoggingIn: false,
          isLoggedIn: success,
          firstName: success ? action.payload.decodedSessionId.firstName : '',
          lastName: success ? action.payload.decodedSessionId.lastName : '',
          profilePictureUrl: success ? action.payload.decodedSessionId.profilePictureUrl : ''
        }
      }

    default:
      return state
  }
}

export default dashboardReducer
