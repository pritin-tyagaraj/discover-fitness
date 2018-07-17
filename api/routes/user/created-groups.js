const getCreatedGroup = (req, res, next) => {
  res.json('GET CREATED GROUPS')
}

module.exports = [{
  method: 'get',
  pattern: '/user/:userId:/createdGroups/:groupId:',
  definition: getCreatedGroup
}]
