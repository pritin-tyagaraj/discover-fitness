import fetch from '../../utils/fetch'
import jwtDecode from 'jwt-decode'

export const START_LOGIN = 'START_LOGIN'
export const HANDLE_LOGIN_RESPONSE = 'HANDLE_LOGIN_RESPONSE'

function startLogin () {
  return {
    type: START_LOGIN
  }
}

function handleLoginResponse (data) {
  return {
    type: HANDLE_LOGIN_RESPONSE,
    payload: data
  }
}

export const login = (accessToken) => async (dispatch) => {
  dispatch(startLogin())

  const fetchResult = await fetch({
    path: '/session',
    method: 'POST',
    body: {
      accessToken
    }
  })

  const loginResponse = await fetchResult.json()
  const sessionId = loginResponse.session
  dispatch(handleLoginResponse({
    success: !!sessionId,
    sessionId,
    decodedSessionId: jwtDecode(sessionId)
  }))
}
