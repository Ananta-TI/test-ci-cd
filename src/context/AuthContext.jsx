/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

const TOKEN_KEY = 'cicd-token'

async function checkSession() {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null
  try {
    const data = await api.me()
    return data.user
  } catch {
    localStorage.removeItem(TOKEN_KEY)
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    checkSession().then((u) => {
      if (!cancelled) {
        setUser(u)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const data = await api.login({ email, password })
      localStorage.setItem(TOKEN_KEY, data.token)
      setUser(data.user)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }, [])

  const register = useCallback(async (name, email, password) => {
    try {
      const data = await api.register({ name, email, password })
      localStorage.setItem(TOKEN_KEY, data.token)
      setUser(data.user)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading, login, register, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
