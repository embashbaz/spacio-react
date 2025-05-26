
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const mongoose = require('mongoose')


const express = require('express')
const authController = require('./controllers/authController')
const entriesController = require('./controllers/entriesController')
const personController = require('./controllers/personController')





const app = express()

const url = config.MONGODB_URI

logger.info('connecting to', url)
mongoose.connect(url)

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })



app.get('/api', (req, res) => {
  res.status(200).json({ status: 'live' })
})

app.use(express.static('dist'))
app.use(express.json())



app.use(middleware.requestLogger)


app.use('/api/auth', authController)
app.use('/api/person', personController)
app.use('/api/entries', entriesController)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


