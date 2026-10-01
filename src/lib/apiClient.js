import axios from 'axios'
import { TOKEN_KEY, USER_KEY } from './storage'
import { formatError } from '../utils/formatError'

export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')
export const api = axios.create({ baseURL: API_URL })
api.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
api.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401) {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    window.dispatchEvent(new Event('auth-change'))
  }
  return Promise.reject(error)
})
export const messageOf = formatError
export const list = value => Array.isArray(value) ? value : []
