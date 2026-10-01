import { api } from '../../../lib/apiClient'
export const generateRoadmap = missingSkills => api.post('/roadmap/generate', { missingSkills })
