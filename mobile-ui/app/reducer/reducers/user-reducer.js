import {
  HANDLE_LOGIN_RESPONSE,
  HANDLE_GET_USER_PROFILE_RESPONSE
} from '../../actions'

const initialUserState = {
  firstName: '',
  lastName: '',
  profilePictureUrl: ''
}

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case HANDLE_LOGIN_RESPONSE:
      const success = !!action.payload.success
      return {
        ...state,
        firstName: success ? action.payload.decodedSessionId.firstName : '',
        lastName: success ? action.payload.decodedSessionId.lastName : '',
        profilePictureUrl: success ? action.payload.decodedSessionId.profilePictureUrl : ''
      }

    case HANDLE_GET_USER_PROFILE_RESPONSE:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        profilePictureUrl: action.payload.profilePictureUrl
      }

    default:
      return state
  }
}

export default userReducer
