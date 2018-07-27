const registerRoutes = require('./register-routes')

let mockServer
const noop = () => {}

describe('helpers > #registerRoutes', () => {
  beforeEach(() => {
    mockServer = {
      del: jest.fn(),
      get: jest.fn(),
      head: jest.fn(),
      opts: jest.fn(),
      patch: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
  })
  it('should register the provided routes on the server', () => {
    const routes = [{
      method: 'get',
      pattern: '/something',
      definition: noop
    }, {
      method: 'post',
      pattern: '/something/else',
      definition: noop
    }]

    registerRoutes(mockServer, routes)

    expect(mockServer.get).toBeCalledWith('/something', noop)
    expect(mockServer.post).toBeCalledWith('/something/else', noop)
    expect(mockServer.del).not.toHaveBeenCalled()
    expect(mockServer.head).not.toHaveBeenCalled()
    expect(mockServer.opts).not.toHaveBeenCalled()
    expect(mockServer.patch).not.toHaveBeenCalled()
    expect(mockServer.put).not.toHaveBeenCalled()
  })
  it('should throw an error if an unsupported method type is provided', () => {
    const routes = [{
      method: 'wat',
      pattern: '/something',
      definition: noop
    }]

    expect(() => {
      registerRoutes(mockServer, routes)
    }).toThrow(new Error(`Method type wat not supported for route /something`))
  })
})
