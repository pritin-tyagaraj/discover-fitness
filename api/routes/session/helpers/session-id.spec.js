const jwt = require('jsonwebtoken')
const { createSessionId } = require('./session-id')

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}))

jest.mock('../../../config', () => ({
  auth: {
    jwtSecret: 'jwt secret',
    jwtExpiresIn: 12345
  }
}))

describe('routes > session > helpers > session-id', () => {
  describe('#createSessionId', () => {
    it('should pass the appropriate parameters to `jwt.sign()`', () => {
      createSessionId('some user id', 'First Name', 'Last Name', 'profile.picture.url')

      expect(jwt.sign).toHaveBeenCalledWith({
        sessionFor: 'some user id',
        firstName: 'First Name',
        lastName: 'Last Name',
        profilePictureUrl: 'profile.picture.url'
      }, 'jwt secret', {
        expiresIn: 12345
      })
    })
  })
})
