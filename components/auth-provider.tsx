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
  logout: () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(storedUser))
      } else if (pathname !== '/login' && pathname !== '/register') {
        router.push('/login')
      }
      setHydrated(true)
    }
  }, [pathname, router])

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }

  if (!hydrated) {
    return null
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
