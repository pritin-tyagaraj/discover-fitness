const config = require('./config')
const mongoose = require('mongoose')
const registerRoutes = require('./helpers/register-routes')
const restify = require('restify')
const restifyPlugins = require('restify').plugins
const routes = require('./routes')

const port = process.env.PORT || 5000

const server = restify.createServer()

server.use(restifyPlugins.bodyParser({
  mapParams: true
}))

registerRoutes(server, routes)

server.listen(port, () => {
  console.log(`Listening at ${server.url}...`)

  mongoose.Promise = global.Promise
  mongoose.connect(config.db.uri, { useNewUrlParser: true })

  const db = mongoose.connection

  db.on('error', (err) => {
    console.error(err)
    process.exit(1)
  })
})
