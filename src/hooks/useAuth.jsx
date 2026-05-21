import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'

const AuthContext = createContext(null)

const SESSION_KEY = 'resumeiq_session'

const USERS_KEY = 'resumeiq_users'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)

  // Restore session on refresh
  useEffect(() => {
    try {
      const savedSession =
        localStorage.getItem(SESSION_KEY)

      if (savedSession) {
        const parsed =
          JSON.parse(savedSession)

        if (parsed?.email) {
          setUser(parsed)
        }
      }
    } catch (err) {
      console.error(
        'Session restore failed:',
        err
      )

      localStorage.removeItem(SESSION_KEY)
    } finally {
      setLoading(false)
    }
  }, [])

  // Login
  const login = (email, password) => {
    const users = JSON.parse(
      localStorage.getItem(USERS_KEY) || '[]'
    )

    const found = users.find(
      u =>
        u.email === email &&
        u.password === password
    )

    if (!found) {
      throw new Error(
        'Invalid email or password.'
      )
    }

    const safeUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      createdAt: found.createdAt,
    }

    setUser(safeUser)

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(safeUser)
    )

    return safeUser
  }

  // Signup
  const signup = (
    name,
    email,
    password
  ) => {
    const users = JSON.parse(
      localStorage.getItem(USERS_KEY) || '[]'
    )

    const exists = users.find(
      u => u.email === email
    )

    if (exists) {
      throw new Error(
        'An account with this email already exists.'
      )
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt:
        new Date().toISOString(),
    }

    users.push(newUser)

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    )

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    }

    setUser(safeUser)

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(safeUser)
    )

    return safeUser
  }

  // Logout
  const logout = () => {
    setUser(null)

    localStorage.removeItem(SESSION_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }

  return ctx
}