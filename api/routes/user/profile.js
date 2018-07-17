const getProfile = (req, res, next) => {
  res.json('GET USER PROFILE')
}

module.exports = [{
  method: 'get',
  pattern: '/user/:userId:/profile',
  definition: getProfile
}]
