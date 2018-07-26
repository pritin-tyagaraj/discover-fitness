const config = require('../../../config')
const jwt = require('jsonwebtoken')

const createSessionId = (userId) => jwt.sign({
  sessionFor: userId
}, config.auth.jwtSecret, {
  expiresIn: config.auth.jwtExpiresIn
})

module.exports = {
  createSessionId
}
