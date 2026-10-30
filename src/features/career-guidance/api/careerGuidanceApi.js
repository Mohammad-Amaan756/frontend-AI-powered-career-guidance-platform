import { api } from '../../../lib/apiClient'
export const getCareerGuidance = () => api.post('/career/guidance', {})
