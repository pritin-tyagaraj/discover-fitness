const fetch = require('node-fetch')
const User = require('./user')

jest.mock('node-fetch', () => jest.fn().mockImplementation(() => ({
  json: jest.fn().mockImplementation(() => ({
    first_name: 'First Name',
    last_name: 'Last Name',
    email: 'email@email.com',
    picture: {
      data: {
        url: 'profile.picture.url'
      }
    }
  }))
})))

const getMockModelConstructor = () => {
  const mockModel = jest.fn()
  mockModel.prototype.save = jest.fn()
  mockModel.createFacebookUser = User.createFacebookUser

  return mockModel
}

describe('models > User', () => {
  describe('#createFacebookUser', () => {
    it('should query Facebook with the expected URL', () => {
      User.createFacebookUser('facebookId', 'facebookUserAccessToken')

      expect(fetch).toHaveBeenCalledWith('https://graph.facebook.com/facebookId?access_token=facebookUserAccessToken&fields=picture,id,first_name,last_name,email')
    })
    it('should create a new user', async () => {
      const mockModel = getMockModelConstructor()
      await User.createFacebookUser.call(mockModel, 'facebookId', 'facebookUserAccessToken')

      expect(mockModel).toHaveBeenCalledWith({
        email: 'email@email.com',
        firstName: 'First Name',
        lastName: 'Last Name',
        profilePictureUrl: 'profile.picture.url',
        facebookId: 'facebookId'
      })
    })
  })
})
