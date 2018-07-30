const [{ definition: createSession }] = require('./create-session')
const { debugFacebookToken } = require('./helpers/debug-token')
const { createSessionId } = require('./helpers/session-id')
const User = require('../../models/user')

let mockResponse
let mockNext
const mockUser = {
  firstName: 'First Name',
  lastName: 'Last Name',
  profilePictureUrl: 'profile.picture.url'
}

jest.mock('./helpers/debug-token', () => ({
  debugFacebookToken: jest.fn()
}))
jest.mock('../../models/user', () => ({
  findOne: jest.fn(),
  createFacebookUser: jest.fn().mockImplementation(() => mockUser)
}))
jest.mock('./helpers/session-id', () => ({
  createSessionId: jest.fn().mockImplementation(() => 'session id')
}))

describe('routes > session > #createSession', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockResponse = {
      json: jest.fn()
    }
    mockNext = jest.fn()
  })

  describe('when an invalid accessToken is received', () => {
    const mockRequest = {
      body: {
        accessToken: 'token'
      }
    }

    beforeEach(() => {
      debugFacebookToken.mockImplementation(() => ({
        isValid: false,
        userId: undefined
      }))
    })
    it('should respond with HTTP 400', async () => {
      await createSession(mockRequest, mockResponse, mockNext)

      expect(mockResponse.json).toBeCalledWith(400, { error: 'Invalid access token' })
      expect(mockNext).toBeCalledTimes(1)
    })
    it('should not query for users', async () => {
      await createSession(mockRequest, mockResponse, mockNext)

      expect(User.findOne).not.toHaveBeenCalled()
    })
  })

  describe('when a valid accessToken is received', () => {
    const mockRequest = {
      body: {
        accessToken: 'token'
      }
    }

    beforeEach(() => {
      debugFacebookToken.mockImplementation(() => ({
        isValid: true,
        userId: 'some user id'
      }))
    })

    describe('when it is a first-time user', () => {
      beforeEach(() => {
        User.findOne.mockImplementation((query) => ({
          exec: () => Promise.resolve(null)
        }))
      })
      it('should create a new user', async () => {
        await createSession(mockRequest, mockResponse, mockNext)

        expect(User.createFacebookUser).toBeCalledWith('some user id', 'token')
      })
      it('should respond with HTTP 200 with a new session ID', async () => {
        await createSession(mockRequest, mockResponse, mockNext)

        expect(createSessionId).toBeCalledWith('some user id', 'First Name', 'Last Name', 'profile.picture.url')
        expect(mockResponse.json).toBeCalledWith(200, { session: 'session id' })
      })
    })
    describe('when it is a returning user', () => {
      beforeEach(() => {
        User.findOne.mockImplementation((query) => ({
          exec: () => Promise.resolve(mockUser)
        }))
      })
      it('should not try to create a new user', async () => {
        await createSession(mockRequest, mockResponse, mockNext)

        expect(User.createFacebookUser).not.toHaveBeenCalled()
      })
      it('should respond with HTTP 200 with a new session ID', async () => {
        await createSession(mockRequest, mockResponse, mockNext)

        expect(createSessionId).toBeCalledWith('some user id', 'First Name', 'Last Name', 'profile.picture.url')
        expect(mockResponse.json).toBeCalledWith(200, { session: 'session id' })
      })
    })
  })

  describe('when no accessToken is received', () => {
    const mockRequest = {
      body: {
        foo: 'bar'
      }
    }

    it('should respond with HTTP 400', async () => {
      await createSession(mockRequest, mockResponse, mockNext)

      expect(mockResponse.json).toBeCalledWith(400, { error: '`accessToken` missing in payload' })
    })
  })
})
