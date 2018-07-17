const methodTypes = [
  'get',
  'head',
  'post',
  'put',
  'patch',
  'del',
  'opts'
]

const registerRoutes = (server, routes) => {
  routes.forEach((route) => {
    if (!methodTypes.includes(route.method)) {
      throw new Error(`Method type ${route.method} not supported for route ${route.pattern}`)
    }

    console.log(`Registering route ${route.pattern}...`)
    server[route.method](route.pattern, route.definition)
  })
}

module.exports = registerRoutes
