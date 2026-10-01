import { api } from '../../../lib/apiClient'
export const analyzeSkillGap = jobDescription => api.post('/skill-gap/analyze', { jobDescription })
