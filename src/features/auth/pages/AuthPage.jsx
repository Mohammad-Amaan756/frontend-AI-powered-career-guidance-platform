import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { messageOf } from '../../../lib/apiClient'
import { login, register as registerAccount } from '../api/authApi'
import { useAuth } from '../hooks/useAuth'
import { Field, Notice } from '../../../components/ui'
import { AuthLayout } from '../../../layouts/AuthLayout'

export function AuthPage({ register = false }) {
  const { user, save } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (user) return <Navigate to="/dashboard" replace />

  const submit = async event => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      const { data } = await (register
        ? registerAccount(form)
        : login({ email: form.email, password: form.password }))
      if (register) {
        navigate('/login', { state: { registered: true } })
        return
      }
      save(data)
      navigate('/dashboard')
    } catch (requestError) {
      setError(messageOf(requestError))
    } finally {
      setBusy(false)
    }
  }

  return <AuthLayout>
    <div className="mobile-brand"><span className="brand-mark">✳</span> pathfinder</div>
    <span className="eyebrow">{register ? 'START YOUR JOURNEY' : 'WELCOME BACK'}</span>
    <h2>{register ? 'Create your account' : 'Sign in to Pathfinder'}</h2>
    <p className="muted">{register ? 'Build a career that feels like yours.' : 'Your next step is waiting for you.'}</p>
    <form onSubmit={submit} className="stack-form">
      {register && <Field label="Full name"><input required autoComplete="name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="Alex Morgan"/></Field>}
      <Field label="Email address"><input type="email" required autoComplete="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} placeholder="you@example.com"/></Field>
      <Field label="Password"><input type="password" required minLength="6" autoComplete={register ? 'new-password' : 'current-password'} value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder="At least 6 characters"/></Field>
      {error && <Notice type="error">{error}</Notice>}
      <button className="button primary full" disabled={busy}>{busy ? 'Please wait…' : register ? 'Create account' : 'Sign in'} <span>→</span></button>
    </form>
    <p className="auth-switch">{register ? 'Already have an account?' : 'New to Pathfinder?'} <Link to={register ? '/login' : '/register'}>{register ? 'Sign in' : 'Create an account'}</Link></p>
    <p className="auth-note">Your profile and progress are private to your account.</p>
  </AuthLayout>
}
