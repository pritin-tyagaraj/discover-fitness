const User = require('../../models/user')

const createUser = (req, res, next) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    facebookId: req.body.facebookId
  }

  let newUser = new User(data)
  newUser.save((err) => {
    if (err) {
      console.error(err)
      next()
    }
    console.log('created new user!')
    res.send(201)
    next()
  })
}

module.exports = [{
  method: 'post',
  pattern: '/user',
  definition: createUser
}]
