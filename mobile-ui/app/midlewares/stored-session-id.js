import * as actions from '../actions'
import { setStoredSessionId } from '../../helpers/stored-session'

const persistSessionId = (store) => (next) => (action) => {
  if (
    action.type === actions.HANDLE_LOGIN_RESPONSE &&
    action.payload.success
  ) {
    const sessionId = action.payload.sessionId
    setStoredSessionId(sessionId)
  }

  next(action)
}

const removeSavedSessionId = (store) => (next) => (action) => {
  // TODO: Delete from store on logout
  next(action)
}

export default [
  persistSessionId,
  removeSavedSessionId
]
