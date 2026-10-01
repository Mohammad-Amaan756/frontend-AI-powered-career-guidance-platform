import { api } from '../../../lib/apiClient'
export const analyzeJobDescription = jobDescription => api.post('/jobs/analyze', { jobDescription })
