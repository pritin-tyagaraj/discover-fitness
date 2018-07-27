const getUserProfile = (req, res, next) => {
  res.json('GET USER PROFILE')
}

module.exports = [{
  method: 'get',
  pattern: '/user',
  definition: getUserProfile
}]
