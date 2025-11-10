const jwt = require('jsonwebtoken')
const Board = require('../models/board')
const boardsRouter = require('express').Router()
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

boardsRouter.get('/', async (request, response) => {
  try {
    const boards = await Board.find({}).populate('user', { username: 1, name: 1 })
    response.json(boards)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'server error' })
  }
})

boardsRouter.get('/:id', async (request, response) => {
  try {
    const board = await Board.findById(request.params.id).populate('user', { username: 1, name: 1 })
    if (!board) {
      return response.status(404).end()
    }
    response.json(board)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'server error' })
  }
})

boardsRouter.post('/', async (request, response) => {
  const { boards } = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'user not found' })
  }

  const board = new Board({
    boards,
    user: user._id
  })

  const savedBoard = await board.save()
  user.boards = user.boards.concat(savedBoard._id)
  await user.save()

  return response.status(201).json(savedBoard)
})

module.exports = boardsRouter
