require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const boardsRouter = require('./controllers/boards')

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/boards', boardsRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
