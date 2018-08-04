import {
  LOADING,
  START_LOGIN,
  HANDLE_LOGIN_RESPONSE,
  HANDLE_GET_USER_PROFILE_RESPONSE
} from './actions'

const initialState = {
  loading: false,
  user: {
    isLoggingIn: false,
    isLoggedIn: false,
    firstName: '',
    lastName: ''
  }
}

// TODO: Reorganize reducer to handle both 'app' and 'user' sections of store
const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload.isLoading
      }

    case START_LOGIN:
      // TODO: Also handle START_GET_USER_PROFILE
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

    case HANDLE_GET_USER_PROFILE_RESPONSE:
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          profilePictureUrl: action.payload.profilePictureUrl
        }
      }

    default:
      return state
  }
}

export default dashboardReducer
