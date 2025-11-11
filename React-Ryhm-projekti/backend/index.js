require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const boardsRouter = require('./controllers/boards')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// API-reitit
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/boards', boardsRouter)

// React buildin sijainti
const buildPath = path.join(__dirname, '../app/dist')
app.use(express.static(buildPath))

// Kaikki muut kuin /api/* → React
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
