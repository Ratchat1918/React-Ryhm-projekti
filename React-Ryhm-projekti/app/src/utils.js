import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.PROD ? '' : 'http://localhost:3001'
})

const notesUrl = '/api/notes'
const usersUrl = '/api/users'
const boardsUrl = '/api/boards'

const getAllNotes = () => api.get(notesUrl).then(res => res.data)
const getUsers = () => api.get(usersUrl).then(res => res.data)

const postUser = (userInfo) =>
  api.post(usersUrl, userInfo).then(res => res.data)

const postBoard = (boardInfo, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return api.post(boardsUrl, boardInfo, config).then(res => res.data)
}

export default {
  getAllNotes,
  getUsers,
  postUser,
  postBoard
}
