"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext, useCallback } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  user: { id: string; email: string } | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking auth status from local storage
    const storedUser = localStorage.getItem("debatequest_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    if (email === "test@example.com" && password === "password") {
      const mockUser = { id: "user-123", email }
      localStorage.setItem("debatequest_user", JSON.stringify(mockUser))
      setUser(mockUser)
      setIsAuthenticated(true)
      setLoading(false)
      return true
    }
    setLoading(false)
    return false
  }, [])

  const register = useCallback(async (email: string, password: string) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    // In a real app, you'd check if email exists, hash password, etc.
    const mockUser = { id: `user-${Date.now()}`, email }
    localStorage.setItem("debatequest_user", JSON.stringify(mockUser))
    setUser(mockUser)
    setIsAuthenticated(true)
    setLoading(false)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("debatequest_user")
    localStorage.removeItem("debatequest_user_progress") // Clear progress on logout
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
