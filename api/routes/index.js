const getRoot = (req, res, next) => {
  res.json('Route /')
}

module.exports = [
  {
    method: 'get',
    pattern: '/',
    definition: getRoot
  },
  ...require('./auth'),
  ...require('./user')
]
