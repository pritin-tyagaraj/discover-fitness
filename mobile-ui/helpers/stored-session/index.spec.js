import {
  getStoredSessionId,
  setStoredSessionId,
  removeStoredSessionId
} from './'
import Expo from 'expo'

jest.mock('expo', () => ({
  SecureStore: {
    getItemAsync: jest.fn().mockReturnValue(Promise.resolve('SESSION ID')),
    setItemAsync: jest.fn().mockReturnValue(Promise.resolve()),
    deleteItemAsync: jest.fn().mockReturnValue(Promise.resolve())
  }
}))

describe('helpers > stored-session', () => {
  beforeEach(jest.restoreAllMocks)
  describe('#getStoredSessionId', () => {
    it('should return the `sessionId` value from Expo\'s SecureStore', async () => {
      const sessionId = await getStoredSessionId()

      expect(sessionId).toBe('SESSION ID')
      expect(Expo.SecureStore.getItemAsync).toBeCalledWith('sessionId')
    })
  })
  describe('#setStoredSessionId', () => {
    it('should set the `sessionId` value in Expo\'s SecureStore', async () => {
      await setStoredSessionId('MY SESSION ID')

      expect(Expo.SecureStore.setItemAsync).toBeCalledWith('sessionId', 'MY SESSION ID')
    })
  })
  describe('#removeStoredSessionId', () => {
    it('should remove the `sessionId` key-value pair from Expo\'s SecureStore', async () => {
      await removeStoredSessionId()

      expect(Expo.SecureStore.deleteItemAsync).toBeCalledWith('sessionId')
    })
  })
})
