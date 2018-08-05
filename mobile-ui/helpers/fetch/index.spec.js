import crossFetch from 'cross-fetch'
import fetch from './'

jest.mock('cross-fetch', () => jest.fn().mockImplementation(() => 'return value'))
jest.mock('../../config', () => ({
  backendBaseUrl: 'BACKEND'
}))

describe('helpers > #fetch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call cross-fetch with fallback values when only path is provided', () => {
    fetch({ path: '/path' })

    expect(crossFetch).toBeCalledWith('BACKEND/path', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  })
  it('should not use fallback values when other parameters are provided', () => {
    fetch({
      path: '/path',
      method: 'POST',
      headers: {
        foo: 'bar'
      },
      body: { some: 'stuff' }
    })

    expect(crossFetch).toBeCalledWith('BACKEND/path', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        foo: 'bar'
      },
      body: '{"some":"stuff"}'
    })
  })
  it('should ignore `body` for `GET` requests', () => {
    fetch({
      path: '/path',
      method: 'GET',
      headers: {
        foo: 'bar'
      },
      body: { some: 'stuff' }
    })

    expect(crossFetch).toBeCalledWith('BACKEND/path', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        foo: 'bar'
      }
    })
  })
  it('should return what cross-fetch returns', () => {
    const returnValue = fetch({ path: '/path' })

    expect(returnValue).toBe('return value')
  })
  describe('query strings', () => {
    it('should append the expected query string when there is a single parameter', () => {
      fetch({
        path: '/path',
        method: 'GET',
        headers: {
          foo: 'bar'
        },
        query: { some: 'stuff' }
      })

      expect(crossFetch).toBeCalledWith('BACKEND/path?some=stuff', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          foo: 'bar'
        }
      })
    })
    it('should append the expected query string when there are multiple parameters', () => {
      fetch({
        path: '/path',
        method: 'GET',
        headers: {
          foo: 'bar'
        },
        query: { some: 'stuff', someMore: 'stuffs' }
      })

      expect(crossFetch).toBeCalledWith('BACKEND/path?some=stuff&someMore=stuffs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          foo: 'bar'
        }
      })
    })
  })
})
