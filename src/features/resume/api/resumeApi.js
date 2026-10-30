import { api } from '../../../lib/apiClient'
export const reviewResume = formData => api.post('/resume/improve', formData)
