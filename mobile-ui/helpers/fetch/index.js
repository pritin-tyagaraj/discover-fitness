import crossFetch from 'cross-fetch'
import config from '../../config'

const getQueryString = (query) => { // TODO: Add tests!
  return Object.keys(query).map((key, index) => {
    let prefix = index === 0 ? '?' : '&'
    return `${prefix}${key}=${query[key]}`
  }).join()
}

const fetch = ({
  path,
  method = 'GET',
  headers = {},
  body = {},
  query = {}
}) => {
  return crossFetch(`${config.backendBaseUrl}${path}${getQueryString(query)}`, {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers
    },
    ...(method === 'POST' ? { body: JSON.stringify(body) } : {}) // TODO: Add tests to check that body is included only if method is POST
  })
}

// TODO: Should be a helper since it uses config etc.
// TODO: Should pass sessionId as request header if available in store (not SecureStore! Check redux store somehow, or store in app context)
export default fetch
