import crossFetch from 'cross-fetch'
import config from '../../config'

const fetch = ({
  path,
  method = 'GET',
  headers = {},
  body = {}
}) => crossFetch(`${config.backendBaseUrl}${path}`, {
  method,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    ...headers
  },
  body: JSON.stringify(body)
})

export default fetch
