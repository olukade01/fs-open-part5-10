import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const createComment = async (id, comment) => {
  const response =  await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

const update = async(id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const del = async (id) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, createComment, setToken, update, del }