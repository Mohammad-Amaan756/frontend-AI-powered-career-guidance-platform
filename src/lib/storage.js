export const TOKEN_KEY = 'career_token'
export const USER_KEY = 'career_user'
export const THEME_KEY = 'career_theme'
export const MISSING_SKILLS_KEY = 'career_missing'
export const readStoredUser = () => JSON.parse(localStorage.getItem(USER_KEY) || 'null')
export const readStoredList = key => {
  try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value : [] }
  catch { return [] }
}
