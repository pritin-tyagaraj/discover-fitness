import * as actions from './actions'
import fetch from '../helpers/fetch'
import jwtDecode from 'jwt-decode'

jest.mock('../helpers/fetch', () => jest.fn().mockReturnValue(
  Promise.resolve({
    json: () => ({
      session: 'SESSION ID'
    })
  }))
)
jest.mock('jwt-decode', () => jest.fn().mockReturnValue('DECODED SESSION ID'))

let dispatch

describe('screens > dashboard > actions', () => {
  beforeEach(() => {
    dispatch = jest.fn()
  })
  describe('#login', () => {
    it('should dispatch the `START_LOGIN` action', async () => {
      await actions.login('ACCESS TOKEN')(dispatch)

      expect(dispatch).toBeCalledWith({
        type: 'START_LOGIN'
      })
    })
    it('should fetch using the right arguments', async () => {
      await actions.login('ACCESS TOKEN')(dispatch)

      expect(fetch).toBeCalledWith({
        path: '/session',
        method: 'POST',
        body: {
          accessToken: 'ACCESS TOKEN'
        }
      })
    })
    it('should pass the fetched sessionId to `jwtDecode`', async () => {
      await actions.login('ACCESS TOKEN')(dispatch)

      expect(jwtDecode).toBeCalledWith('SESSION ID')
    })
    it('should trigger the `HANDLE_LOGIN_RESPONSE` action', async () => {
      await actions.login('ACCESS TOKEN')(dispatch)

      expect(dispatch).toBeCalledWith({
        type: 'HANDLE_LOGIN_RESPONSE',
        payload: {
          success: true,
          sessionId: 'SESSION ID',
          decodedSessionId: 'DECODED SESSION ID'
        }
      })
    })
  })
})
