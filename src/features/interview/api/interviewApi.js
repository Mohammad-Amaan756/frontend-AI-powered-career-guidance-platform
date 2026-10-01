import { api } from '../../../lib/apiClient'
export const generateQuestion = payload => api.post('/interview/question', payload)
export const evaluateAnswer = payload => api.post('/interview/evaluate', payload)
export const getInterviewHistory = () => api.get('/interview/history')
