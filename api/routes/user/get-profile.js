const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const getUserProfile = async (req, res, next) => {
  const sessionId = req.query.sessionId
  if (!sessionId) {
    res.json(400, { error: '`sessionId` missing in payload' })
    return next()
  }

  const decodedSessionId = jwt.decode(sessionId)
  const user = await User.findOne({ facebookId: decodedSessionId.userId }).exec()
  res.json(200, {
    firstName: user.firstName,
    lastName: user.lastName,
    profilePictureUrl: user.profilePictureUrl
  })
  return next()
}

module.exports = [{
  method: 'get',
  pattern: '/user',
  definition: getUserProfile
}]
