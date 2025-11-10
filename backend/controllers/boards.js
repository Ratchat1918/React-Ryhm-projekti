const Board = require('../models/board')
const boardsRouter = require('express').Router()
const User = require('../models/user')

boardsRouter.get('/', async (request, response) => {
  try {
    const boards = await Board.find({})
    response.json(boards)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'server error' })
  }
})

boardsRouter.get('/:id', async (request, response) => {
  const board = await Board.findById(request.params.id)
  if (board) {
    response.json(board)
  } else {
    response.status(404).end()
  }
})

boardsRouter.post('/', async (request, response) => {
  const { boards, userId } = request.body

  const user = await User.findById(userId)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
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