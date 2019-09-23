const express = require('express')

const app = express()

app.listen(2002, () => {
  console.log('Server start on port 2002')
})