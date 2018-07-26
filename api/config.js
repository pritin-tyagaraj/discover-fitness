module.exports = {
  env: process.env.NODE_ENV || 'development',
  db: {
    uri: (process.env.MONGODB_USER && process.env.MONGODB_PASSWORD)
      ? `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@discover-fitness-hca2y.mongodb.net/api?retryWrites=true`
      : 'mongodb://127.0.0.1:27017/api'
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'Shh...',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || 60 * 60 * 14,
    facebookAppId: process.env.FACEBOOK_APP_ID,
    facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
    facebookAppToken: `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`
  }
}
