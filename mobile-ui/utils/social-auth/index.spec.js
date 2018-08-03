import { AuthSession } from 'expo'
import config from '../../config'
import { startLoginFlow } from './'

jest.mock('expo', () => ({
  AuthSession: {
    getRedirectUrl: () => 'redirect.url',
    startAsync: jest.fn().mockReturnValue({
      params: {
        access_token: 'ACCESS TOKEN'
      }
    })
  }
}))
jest.mock('../../config', () => ({
  facebookAppId: 'FACEBOOK APP ID'
}))

describe('utils > social-auth', () => {
  describe('facebook > #startLoginFlow', () => {
    it('should configure `AuthSession` with the expected URL', async () => {
      await startLoginFlow()

      expect(AuthSession.startAsync).toBeCalledWith({
        authUrl: `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${config.facebookAppId}` +
        `&redirect_uri=${encodeURIComponent('redirect.url')}` +
        `&scope=public_profile,email`
      })
    })
    it('should return the access token returned by Facebook', async () => {
      const accessToken = await startLoginFlow()

      expect(accessToken).toBe('ACCESS TOKEN')
    })
  })
})
