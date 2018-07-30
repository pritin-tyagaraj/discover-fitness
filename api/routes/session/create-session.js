const User = require('../../models/user')
const { debugFacebookToken } = require('./helpers/debug-token')
const { createSessionId } = require('./helpers/session-id')

const createSession = async (req, res, next) => {
  const accessToken = req.body.accessToken
  if (!accessToken) {
    res.json(400, { error: '`accessToken` missing in payload' })
    return next()
  }

  const { isValid, userId } = await debugFacebookToken(accessToken)
  if (!isValid) {
    res.json(400, { error: 'Invalid access token' })
    return next()
  }

  let user = await User.findOne({ facebookId: userId }).exec()
  if (!user) {
    user = await User.createFacebookUser(userId, accessToken)
  }
  const session = createSessionId(userId, user.firstName, user.lastName, user.profilePictureUrl)
  res.json(200, { session })
  return next()
}

module.exports = [{
  method: 'post',
  pattern: '/session',
  definition: createSession
}]
