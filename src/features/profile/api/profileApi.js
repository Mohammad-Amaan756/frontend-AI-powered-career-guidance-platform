import { api } from '../../../lib/apiClient'
export const getProfile = () => api.get('/profile')
export const updateProfile = payload => api.put('/profile', payload)
