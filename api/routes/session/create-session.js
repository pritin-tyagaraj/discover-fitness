const User = require('../../models/user')
const { debugFacebookToken } = require('./helpers/debug-token')
const { createSessionId } = require('./helpers/session-id')

const createSession = async (req, res, next) => {
  const accessToken = req.body.accessToken
  const { isValid, userId } = await debugFacebookToken(accessToken)
  if (!isValid) {
    res.send(400, 'Invalid access token')
    return next()
  }

  User.findOne({ facebookId: userId }, async (err, user) => {
    if (!user) {
      await User.createFacebookUser(userId, accessToken)
    }
    const session = createSessionId(userId)
    res.json(200, { session })
  })
}

module.exports = [{
  method: 'post',
  pattern: '/session',
  definition: createSession
}]
