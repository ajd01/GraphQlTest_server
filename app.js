const express = require('express')
const grapqlHTTP = require('express-graphql')

const schema = require('./schema/schema')

const app = express()

app.use('/graphql', grapqlHTTP({
  schema,
  graphiql:true
}))

app.listen(2002, () => {
  console.log('Server start on port 2002')
})