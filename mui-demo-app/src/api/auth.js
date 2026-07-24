import client from './client'

export const signup = async (payload) => {
  const response = await client.post('/auth/signup', payload)
  return response.data
}

export const login = async (payload) => {
  const response = await client.post('/auth/login', payload)
  return response.data
}
