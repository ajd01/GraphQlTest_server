const express = require('express')
const grapqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())

mongoose 
  .connect()
  .catch(err => {
    console.log(err)
  })

mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB')
})


app.use('/graphql', grapqlHTTP({
  schema,
  graphiql:true
}))

app.listen(2002, () => {
  console.log('Server start on port 2002')
})