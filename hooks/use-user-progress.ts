"use client"

import { useState, useEffect } from "react"
import type { UserProgress } from "@/lib/types"
import { mockUserProgress } from "@/lib/data"

// This hook simulates user progress management.
// In a real app, this would interact with Firebase/Supabase.
export function useUserProgress() {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user data
    const storedProgress = localStorage.getItem("userProgress")
    if (storedProgress) {
      setUserProgress(JSON.parse(storedProgress))
    } else {
      // For demo, initialize with mock data if no progress found
      setUserProgress(mockUserProgress)
      localStorage.setItem("userProgress", JSON.stringify(mockUserProgress))
    }
    setLoading(false)
  }, [])

  const updateProgress = (updates: Partial<UserProgress>) => {
    setUserProgress((prev) => {
      if (!prev) return null
      const newProgress = { ...prev, ...updates }
      localStorage.setItem("userProgress", JSON.stringify(newProgress))
      return newProgress
    })
  }

  const addXp = (amount: number) => {
    updateProgress((prev) => {
      if (!prev) return {}
      const newXp = prev.xp + amount
      const newLevel = Math.floor(newXp / 200) + 1 // Example: 200 XP per level
      return { xp: newXp, level: newLevel }
    })
  }

  const addBadge = (badgeName: string) => {
    updateProgress((prev) => {
      if (!prev) return {}
      if (!prev.badges.includes(badgeName)) {
        return { badges: [...prev.badges, badgeName] }
      }
      return {}
    })
  }

  const resetProgress = () => {
    localStorage.removeItem("userProgress")
    setUserProgress(mockUserProgress) // Reset to initial mock state
  }

  return { userProgress, loading, updateProgress, addXp, addBadge, resetProgress }
}
