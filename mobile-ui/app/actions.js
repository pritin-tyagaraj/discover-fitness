import fetch from '../helpers/fetch'
import jwtDecode from 'jwt-decode'
import { createAction } from 'redux-actions'

export const READY = 'READY'
export const LOADING = 'LOADING'
export const START_LOGIN = 'START_LOGIN'
export const HANDLE_LOGIN_RESPONSE = 'HANDLE_LOGIN_RESPONSE'
export const START_GET_USER_PROFILE = 'START_GET_USER_PROFILE'
export const HANDLE_GET_USER_PROFILE_RESPONSE = 'HANDLE_GET_USER_PROFILE_RESPONSE'

const startLogin = createAction(START_LOGIN)
const handleLoginResponse = createAction(HANDLE_LOGIN_RESPONSE)
const startGetUserProfile = createAction(START_GET_USER_PROFILE)
const handleGetUserProfileResponse = createAction(HANDLE_GET_USER_PROFILE_RESPONSE)

export const ready = createAction(READY)
export const loading = createAction(LOADING) // TODO: Tests missing

export const login = (accessToken) => async (dispatch) => {
  dispatch(startLogin())

  const fetchResult = await fetch({
    path: '/session',
    method: 'POST',
    body: {
      accessToken
    }
  })

  const loginResponse = await fetchResult.json() // TODO: fetch util should apply .json() already
  const sessionId = loginResponse.session
  dispatch(handleLoginResponse({
    success: !!sessionId,
    sessionId,
    decodedSessionId: jwtDecode(sessionId)
  }))
}

export const getUserProfile = (storedSessionId) => async (dispatch) => {
  dispatch(startGetUserProfile())

  const fetchResult = await fetch({
    path: '/user',
    method: 'GET',
    query: {
      sessionId: storedSessionId
    }
  })

  const profileData = await fetchResult.json()
  dispatch(handleGetUserProfileResponse(profileData))
}
