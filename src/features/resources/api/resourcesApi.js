import { api } from '../../../lib/apiClient'
export const recommendResources = skills => api.post('/resources/recommend', { skills })
