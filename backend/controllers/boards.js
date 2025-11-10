

const Board = require('../models/board')
const boardsRouter = require('express').Router()

boardsRouter.get('/', async (request, response) => {
  try {
    const boards = await Board.find({})
    response.json(boards)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'server error' })
  }
})

module.exports = boardsRouter