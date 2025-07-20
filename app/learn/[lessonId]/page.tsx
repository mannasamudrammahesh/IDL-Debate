"use client"

import { LessonContent } from "@/components/learn/lesson-content"
import { QuizChallenge } from "@/components/learn/quiz-challenge"
import { LevelUpModal } from "@/components/learn/level-up-modal"
import { mockLessons } from "@/lib/data"
import { useUserProgress } from "@/hooks/use-user-progress"
import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface LessonPageProps {
  params: {
    lessonId: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = params
  const lesson = mockLessons.find((l) => l.id === lessonId)
  const { userProgress, loading, updateProgress, addXp, addBadge } = useUserProgress()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<{ newLevel?: number; xpEarned?: number; badgesEarned?: string[] }>({})

  useEffect(() => {
    if (!loading && userProgress && userProgress.level !== userProgress.xp / 200 + 1) {
      // This is a simplified check. In a real app, you'd compare old vs new level.
      // For demo, we'll just show it if XP was added and level might have changed.
      // This is a bit hacky for a demo, a proper state management for level changes would be better.
    }
  }, [userProgress, loading])

  if (!lesson) {
    notFound()
  }

  const handleQuizComplete = (xpEarned: number, badgesEarned: string[]) => {
    const oldLevel = userProgress?.level || 0
    addXp(xpEarned)
    badgesEarned.forEach((badge) => addBadge(badge))

    // Mark lesson as completed
    updateProgress((prev) => {
      if (!prev) return {}
      const updatedModulesCompleted = prev.modulesCompleted + 1
      return { modulesCompleted: updatedModulesCompleted }
    })

    // Simulate level up check
    const newLevel = Math.floor(((userProgress?.xp || 0) + xpEarned) / 200) + 1
    const didLevelUp = newLevel > oldLevel

    setModalData({
      xpEarned,
      newLevel: didLevelUp ? newLevel : undefined,
      badgesEarned: badgesEarned.length > 0 ? badgesEarned : undefined,
    })
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100svh-65px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">{lesson.title}</h1>
      <p className="text-lg text-muted-foreground">{lesson.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)]">
        <Card className="flex flex-col">
          <CardContent className="p-0 flex-grow overflow-hidden">
            <LessonContent content={lesson.content} diagramUrl={lesson.diagramUrl} />
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardContent className="p-0 flex-grow overflow-hidden">
            <QuizChallenge quiz={lesson.quiz} onQuizComplete={handleQuizComplete} />
          </CardContent>
        </Card>
      </div>

      <LevelUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newLevel={modalData.newLevel}
        xpEarned={modalData.xpEarned}
        badgesEarned={modalData.badgesEarned}
      />
    </main>
  )
}
