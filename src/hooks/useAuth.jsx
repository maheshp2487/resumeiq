import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('rai_session')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem('rai_session')
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('rai_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid email or password.')
    const { password: _, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem('rai_session', JSON.stringify(safeUser))
    return safeUser
  }

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('rai_users') || '[]')
    if (users.find(u => u.email === email)) {
      throw new Error('An account with this email already exists.')
    }
    const newUser = { id: Date.now().toString(), name, email, password, createdAt: new Date().toISOString() }
    users.push(newUser)
    localStorage.setItem('rai_users', JSON.stringify(users))
    const { password: _, ...safeUser } = newUser
    setUser(safeUser)
    localStorage.setItem('rai_session', JSON.stringify(safeUser))
    return safeUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('rai_session')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
