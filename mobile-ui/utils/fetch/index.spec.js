import crossFetch from 'cross-fetch'
import fetch from './'

jest.mock('cross-fetch', () => jest.fn().mockImplementation(() => 'return value'))
jest.mock('../../config', () => ({
  backendBaseUrl: 'BACKEND'
}))

describe('utils > #fetch', () => {
  it('should call cross-fetch with fallback values when only path is provided', () => {
    fetch({ path: '/path' })

    expect(crossFetch).toBeCalledWith('BACKEND/path', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: '{}'
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
  it('should return what cross-fetch returns', () => {
    const returnValue = fetch({ path: '/path' })

    expect(returnValue).toBe('return value')
  })
})
