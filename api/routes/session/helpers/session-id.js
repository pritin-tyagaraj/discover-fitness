const config = require('../../../config')
const jwt = require('jsonwebtoken')

const createSessionId = (userId, firstName, lastName, profilePictureUrl) => jwt.sign({
  firstName,
  lastName,
  profilePictureUrl,
  sessionFor: userId
}, config.auth.jwtSecret, {
  expiresIn: config.auth.jwtExpiresIn
})

module.exports = {
  createSessionId
}
