const { debugFacebookToken } = require('./debug-token')
const fetch = require('node-fetch')

jest.mock('node-fetch', () => jest.fn().mockImplementation((url) => ({
  json: () => {
    const token = url.match(/input_token=([a-zA-Z0-9+/=]+)/)[1]
    if (token === 'goodToken') {
      return {
        data: {
          app_id: 'someAppId',
          type: 'USER',
          application: 'someApp',
          expires_at: 1537815836,
          is_valid: true,
          issued_at: 1532631836,
          scopes: [
            'email',
            'public_profile'
          ],
          user_id: 'someUserId'
        }
      }
    } else {
      return {
        data: {
          error: {
            code: 190,
            message: 'Malformed access token'
          },
          is_valid: false,
          scopes: [
          ]
        }
      }
    }
  }
})))

jest.mock('../../../config', () => ({
  auth: {
    facebookAppId: 'myAppId',
    facebookAppSecret: 'myAppSecret'
  }
}))

describe('routes > session > helpers > debug-token', () => {
  describe('#debugFacebookToken', () => {
    it('should query Facebook with the expected URL', () => {
      debugFacebookToken('goodToken')

      expect(fetch).toHaveBeenCalledWith('https://graph.facebook.com/debug_token?input_token=goodToken&access_token=myAppId|myAppSecret')
    })
    describe('when the token is invalid', () => {
      it('should return `isValid` as false', () => {

      })
    })
    describe('when the token is valid', () => {
      it('should return `isValid` as true, and the facebook user ID corresponding to the token', async () => {
        const result = await debugFacebookToken('goodToken')

        expect(result).toEqual({
          isValid: true,
          userId: 'someUserId'
        })
      })
    })
  })
})
