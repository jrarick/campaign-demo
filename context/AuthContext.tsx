"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { getCookie, setCookie } from "cookies-next"

type User = { username: string }

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USERS = [
  { username: "joe-blow", password: "password1" },
  { username: "jane-doe", password: "password2" },
]

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const username = getCookie("user")
    if (typeof username === "string") {
      setUser({ username })
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    const foundUser = USERS.find(
      (u) => u.username === username && u.password === password
    )
    if (foundUser) {
      setUser({ username: foundUser.username })
      setCookie("user", foundUser.username, { maxAge: 60 * 60 * 24 })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setCookie("user", "", { maxAge: 0 })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
