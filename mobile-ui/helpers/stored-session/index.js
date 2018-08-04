import Expo from 'expo'

const SecureStore = Expo.SecureStore

export const getStoredSessionId = () => {
  return SecureStore.getItemAsync('sessionId')
}

export const setStoredSessionId = (sessionId) => {
  return SecureStore.setItemAsync('sessionId', sessionId)
}

export const removeStoredSessionId = () => {
  return SecureStore.deleteItemAsync('sessionId')
}

// TODO: Add tests
