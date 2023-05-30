if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const PORT = process.env.PORT || 3001

const app = express()

app.post(`${process.env.ENDPOINT}`, (req, res) => {
  res.send('hi')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
