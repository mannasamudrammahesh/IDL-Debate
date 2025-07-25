"use client"

import type React from "react"

import { useState, useEffect, useCallback, createContext, useContext } from "react"
import { mockUserProgress, mockLessons } from "@/lib/data"
import type { UserProgress } from "@/lib/types"

interface UserProgressContextType {
  userProgress: UserProgress | null
  loading: boolean
  updateProgress: (updates: Partial<UserProgress>) => void
  addXp: (amount: number) => void
  addBadge: (badgeName: string) => void
  markLessonCompleted: (lessonId: string) => void
  resetProgress: () => void
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined)

export function UserProgressProvider({ children }: { children: React.ReactNode }) {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedProgress = localStorage.getItem("debatequest_user_progress")
    if (storedProgress) {
      setUserProgress(JSON.parse(storedProgress))
    } else {
      // Initialize with mock data if no stored progress
      setUserProgress(mockUserProgress)
      localStorage.setItem("debatequest_user_progress", JSON.stringify(mockUserProgress))
    }
    setLoading(false)
  }, [])

  const updateProgress = useCallback((updates: Partial<UserProgress>) => {
    setUserProgress((prev) => {
      if (!prev) return null
      const newProgress = { ...prev, ...updates }
      localStorage.setItem("debatequest_user_progress", JSON.stringify(newProgress))
      return newProgress
    })
  }, [])

  const addXp = useCallback((amount: number) => {
    setUserProgress((prev) => {
      if (!prev) return null
      const newXp = prev.xp + amount
      const newLevel = Math.floor(newXp / 200) + 1 // 200 XP per level
      const updatedProgress = { ...prev, xp: newXp, level: newLevel }
      localStorage.setItem("debatequest_user_progress", JSON.stringify(updatedProgress))
      return updatedProgress
    })
  }, [])

  const addBadge = useCallback((badgeName: string) => {
    setUserProgress((prev) => {
      if (!prev) return null
      if (!prev.badges.includes(badgeName)) {
        const updatedProgress = { ...prev, badges: [...prev.badges, badgeName] }
        localStorage.setItem("debatequest_user_progress", JSON.stringify(updatedProgress))
        return updatedProgress
      }
      return prev
    })
  }, [])

  const markLessonCompleted = useCallback((lessonId: string) => {
    setUserProgress((prev) => {
      if (!prev) return null
      const lesson = mockLessons.find((l) => l.id === lessonId)
      if (lesson && !lesson.completed) {
        // In a real app, you'd update the lesson's completed status in a DB
        // For mock, we'll just update modulesCompleted and XP
        const updatedModulesCompleted = prev.modulesCompleted + 1
        const newXp = prev.xp + lesson.xpReward
        const newLevel = Math.floor(newXp / 200) + 1
        const updatedProgress = {
          ...prev,
          modulesCompleted: updatedModulesCompleted,
          xp: newXp,
          level: newLevel,
          lastLessonId: lessonId,
          lastLessonProgress: 100,
        }
        localStorage.setItem("debatequest_user_progress", JSON.stringify(updatedProgress))
        return updatedProgress
      }
      return prev
    })
  }, [])

  const resetProgress = useCallback(() => {
    localStorage.removeItem("debatequest_user_progress")
    setUserProgress(mockUserProgress) // Reset to initial mock state
    localStorage.setItem("debatequest_user_progress", JSON.stringify(mockUserProgress))
  }, [])

  return (
    <UserProgressContext.Provider
      value={{ userProgress, loading, updateProgress, addXp, addBadge, markLessonCompleted, resetProgress }}
    >
      {children}
    </UserProgressContext.Provider>
  )
}

export function useUserProgress() {
  const context = useContext(UserProgressContext)
  if (context === undefined) {
    throw new Error("useUserProgress must be used within a UserProgressProvider")
  }
  return context
}
