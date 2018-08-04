import initSequenceMiddlewares from './init-sequence'
import storedSessionIdMiddlewares from './stored-session-id'

export default [
  ...initSequenceMiddlewares,
  ...storedSessionIdMiddlewares
]
