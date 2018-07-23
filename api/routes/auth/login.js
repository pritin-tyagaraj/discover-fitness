const config = require('../../config')
const fetch = require('node-fetch')
const User = require('../../models/user')

const appAccessToken = `${config.auth.facebookAppId}|${config.auth.facebookAppSecret}`

const debugAccessToken = async (token) => {
  const validateTokenUrl = `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${appAccessToken}`
  const fetchResult = await fetch(validateTokenUrl)
  const response = await fetchResult.json()

  return {
    isValid: response.data.is_valid,
    userId: response.data.user_id
  }
}

const createUser = async (facebookId) => {
  // Get the user info that we need
  const queryResult = await fetch(`https://graph.facebook.com/${facebookId}` +
    `?access_token=${appAccessToken}` +
    `&fields=picture,id,first_name,last_name,email`)
  const userInfo = await queryResult.json()
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    picture: {
      data: {
        url: profilePictureUrl
      }
    }
  } = userInfo

  // Add entry to database
  const newUser = new User({ email, firstName, lastName, profilePictureUrl, facebookId })
  newUser.save()
}

const createNewSession = (userId) => {
  return {
    sessionFor: userId
  }
}

const login = async (req, res, next) => {
  // Do we have a valid accessToken?
  const accessToken = req.body.accessToken
  const { isValid, userId } = await debugAccessToken(accessToken)
  if (!isValid) {
    res.send(400, 'Invalid access token')
    return next()
  }

  // Is this a returning user?
  User.findOne({ facebookId: userId }, async (err, doc) => {
    if (!doc) {
      await createUser(userId)
    }
    const session = createNewSession(userId)
    res.json(200, { session })
  })
}

module.exports = [{
  method: 'post',
  pattern: '/login',
  definition: login
}]
