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

  const foundUser = await User.findOne({ facebookId: userId }).exec()
  if (!foundUser) {
    await User.createFacebookUser(userId, accessToken)
  }
  const session = createSessionId(userId)
  res.json(200, { session })
  return next()
}

module.exports = [{
  method: 'post',
  pattern: '/session',
  definition: createSession
}]
