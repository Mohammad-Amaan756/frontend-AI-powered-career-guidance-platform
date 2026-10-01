import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useTheme } from '../app/hooks/useTheme'
import { TOKEN_KEY } from '../lib/storage'
import { Icon } from '../components/ui/Icon'
import { MainLayout } from './MainLayout'

const navigationItems = [
  ['/dashboard', '◫', 'Overview'],
  ['/job-analyzer', '⌕', 'Job analyzer'],
  ['/skill-gap', '◎', 'Skill gap'],
  ['/learning-roadmap', '⌁', 'Learning roadmap'],
  ['/career-guidance', '✳', 'Career paths'],
  ['/resume-improvement', '▤', 'Resume review'],
  ['/mock-interview', '◇', 'Mock interview'],
  ['/profile', '◉', 'My profile'],
]

export function Shell({ children, title, description, action }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { darkMode, setDarkMode } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    if (!profileMenuOpen) return undefined
    const closeOutside = event => {
      if (!profileMenuRef.current?.contains(event.target)) setProfileMenuOpen(false)
    }
    const closeOnEscape = event => {
      if (event.key === 'Escape') setProfileMenuOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [profileMenuOpen])

  const signOut = () => {
    setProfileMenuOpen(false)
    logout()
    navigate('/login')
  }
  const userInitial = (user?.name || 'S').slice(0, 1).toUpperCase()
  const currentPage = navigationItems.find(([path]) => path === location.pathname)?.[2] || 'Overview'

  return <div className="app-shell">
    <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Link to="/dashboard" className="brand"><span className="brand-mark">✳</span> pathfinder</Link>
      <div className="workspace-label">WORKSPACE</div>
      <nav aria-label="Main navigation">
        {navigationItems.map(([to, icon, label]) => <NavLink onClick={() => setSidebarOpen(false)} key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Icon>{icon}</Icon>{label}{to === '/skill-gap' && <span className="nav-dot"/>}
        </NavLink>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-tip"><div className="tip-icon">✦</div><strong>Small steps add up</strong><p>Your career is a journey. Keep moving forward.</p><Link to="/career-guidance">Explore your path <span>→</span></Link></div>
        <button className="user-card" onClick={() => navigate('/profile')}><span className="avatar">{userInitial}</span><span className="user-meta"><strong>{user?.name || 'Student'}</strong><small>{user?.email}</small></span><span className="user-menu">···</span></button>
      </div>
    </aside>
    {sidebarOpen && <button className="mobile-shade" aria-label="Close menu" onClick={() => setSidebarOpen(false)}/>}
    <main className="main-area">
      <header className="topbar">
        <button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle navigation">☰</button>
        <div className="breadcrumb">Workspace <span>/</span> <b>{currentPage}</b></div>
        <div className="top-actions">
          <button className="theme-toggle" type="button" role="switch" aria-checked={darkMode} onClick={() => setDarkMode(!darkMode)} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            <span className="theme-icon">{darkMode ? '☾' : '☀'}</span><span className="toggle-track"><i/></span><span className="theme-label">{darkMode ? 'Dark' : 'Light'}</span>
          </button>
          <button className="icon-button" title="Sign out" onClick={signOut}>↗</button>
          <div className="profile-menu-wrap" ref={profileMenuRef}>
            <button className="top-profile" aria-haspopup="menu" aria-expanded={profileMenuOpen} onClick={() => setProfileMenuOpen(value => !value)}>
              <span className="avatar small">{userInitial}</span>{user?.name?.split(' ')[0] || 'Student'}<span className={`chevron ${profileMenuOpen ? 'chevron-open' : ''}`}>⌄</span>
            </button>
            {profileMenuOpen && <div className="profile-dropdown" role="menu">
              <div className="dropdown-identity"><span className="avatar small">{userInitial}</span><span><strong>{user?.name || 'Student'}</strong><small>{user?.email}</small></span></div>
              <div className="dropdown-divider"/>
              <button role="menuitem" onClick={() => { setProfileMenuOpen(false); navigate('/profile') }}><span>◉</span> My profile</button>
              <button role="menuitem" className="dropdown-logout" onClick={signOut}><span>↪</span> Log out</button>
            </div>}
          </div>
        </div>
      </header>
      <MainLayout title={title} description={description} action={action} onLogout={signOut}>{children}</MainLayout>
    </main>
  </div>
}

export function AppFrame(props) {
  return <Shell {...props}/>
}

export function Protected({ children }) {
  return localStorage.getItem(TOKEN_KEY) ? children : <Navigate to="/login" replace/>
}
