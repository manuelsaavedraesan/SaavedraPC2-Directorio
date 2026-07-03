import axios from 'axios'

const API = 'https://dummyjson.com'

export async function getUsers({ limit = 10, skip = 0 } = {}) {
  const response = await axios.get(`${API}/users`, {
    params: { limit, skip },
  })

  return response.data.users || []
}

export async function getAllUsers() {
  const response = await axios.get(`${API}/users`, {
    params: { limit: 0 },
  })

  return response.data.users || []
}

export async function searchUsers(text) {
  const response = await axios.get(`${API}/users/search`, {
    params: { q: text },
  })

  return response.data.users || []
}

export async function getUserById(id) {
  const response = await axios.get(`${API}/users/${id}`)
  return response.data
}

export async function getUserCarts(id) {
  const response = await axios.get(`${API}/users/${id}/carts`)
  return response.data.carts || []
}