const restify = require('restify')

const port = process.env.PORT || 5000

const respond = (req, res, next) => {
  res.send('Tjena!')
  next()
}

const server = restify.createServer()
server.get('/', respond)
server.listen(port, () => {
  console.log('Listening...')
})
