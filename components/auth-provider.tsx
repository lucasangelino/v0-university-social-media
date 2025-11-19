'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for user session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else if (pathname !== '/login' && pathname !== '/register') {
      router.push('/login')
    }
    setLoading(false)
  }, [pathname, router])

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }

  if (loading) {
    return null
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
