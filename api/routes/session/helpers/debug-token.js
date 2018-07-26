const config = require('../../../config')
const fetch = require('node-fetch')

const appAccessToken = `${config.auth.facebookAppId}|${config.auth.facebookAppSecret}`

const debugFacebookToken = async (token) => {
  const validateTokenUrl = `https://graph.facebook.com/debug_token` +
  `?input_token=${token}` +
  `&access_token=${appAccessToken}`

  const fetchResult = await fetch(validateTokenUrl)
  const response = await fetchResult.json()
  return {
    isValid: response.data.is_valid,
    userId: response.data.user_id
  }
}

module.exports = {
  debugFacebookToken
}
