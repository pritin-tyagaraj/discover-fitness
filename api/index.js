const restify = require('restify')
const registerRoutes = require('./helpers/register-routes')
const routes = require('./routes')

const port = process.env.PORT || 5000

const server = restify.createServer()
registerRoutes(server, routes)
server.listen(port, () => {
  console.log(`Listening at ${server.url}...`)
})
