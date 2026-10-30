import { useEffect, useState } from 'react'
import { TOKEN_KEY, USER_KEY, THEME_KEY, readStoredUser } from '../lib/storage'
import { AuthContext } from '../features/auth/context/AuthContext'
import { ThemeContext } from './context/ThemeContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  useEffect(() => {
    const update = () => setUser(readStoredUser())
    window.addEventListener('auth-change', update)
    return () => window.removeEventListener('auth-change', update)
  }, [])
  const save = data => { localStorage.setItem(TOKEN_KEY, data.token); localStorage.setItem(USER_KEY, JSON.stringify(data.user)); setUser(data.user) }
  const logout = () => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); setUser(null) }
  return <AuthContext.Provider value={{ user, save, logout }}>{children}</AuthContext.Provider>
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(THEME_KEY) === 'dark')
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light')
  }, [darkMode])
  return <ThemeContext.Provider value={{ darkMode, setDarkMode }}>{children}</ThemeContext.Provider>
}
