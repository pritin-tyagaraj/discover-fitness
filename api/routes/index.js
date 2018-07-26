const getRoot = (req, res, next) => {
  res.json('Route /')
}

module.exports = [
  {
    method: 'get',
    pattern: '/',
    definition: getRoot
  },
  ...require('./session'),
  ...require('./user')
]
