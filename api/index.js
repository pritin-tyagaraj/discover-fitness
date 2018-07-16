const restify = require('restify')

const respond = (req, res, next) => {
  res.send('Tjena!')
  next()
}

const server = restify.createServer()
server.get('/', respond)
server.listen(8080, () => {
  console.log('Listening...')
})
