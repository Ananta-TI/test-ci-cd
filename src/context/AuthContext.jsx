/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'cicd-users'
const SESSION_KEY = 'cicd-session'

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSession)

  const login = useCallback((email, password) => {
    const users = getUsers()
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) return { success: false, message: 'Email atau password salah' }

    const session = { id: found.id, name: found.name, email: found.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return { success: true }
  }, [])

  const register = useCallback((name, email, password) => {
    const users = getUsers()
    if (users.find((u) => u.email === email)) {
      return { success: false, message: 'Email sudah terdaftar' }
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    }
    users.push(newUser)
    saveUsers(users)

    const session = { id: newUser.id, name: newUser.name, email: newUser.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
