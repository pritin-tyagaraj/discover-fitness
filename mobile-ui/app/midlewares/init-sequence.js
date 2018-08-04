import * as actions from '../actions'
import { getStoredSessionId } from '../../helpers/stored-session'

const orchestrateAppInit = (store) => (next) => async (action) => {
  if (action.type === actions.READY) {
    store.dispatch(actions.loading(true))

    const storedSessionId = await getStoredSessionId()
    if (storedSessionId) {
      await store.dispatch(actions.getUserProfile(storedSessionId))
      // TODO: If it failed because of invalid sessionId, delete stored sessionId
    }

    store.dispatch(actions.loading(false))
  }

  next(action)
}

export default [
  orchestrateAppInit
]
