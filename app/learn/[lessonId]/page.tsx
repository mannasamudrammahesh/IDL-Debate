"use client"

import { Button } from "@/components/ui/button"

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
  const { userProgress, loading, addXp, addBadge, markLessonCompleted } = useUserProgress()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<{ newLevel?: number; xpEarned?: number; badgesEarned?: string[] }>({})

  if (!lesson) {
    notFound()
  }

  // Check if lesson is locked
  const isLocked = !loading && userProgress && lesson.level > userProgress.level

  useEffect(() => {
    if (!loading && userProgress && userProgress.lastLessonId !== lessonId) {
      // Update last lesson progress when entering a new lesson
      // In a real app, you'd save progress periodically
      // For this demo, we'll just set it to 0 if it's a new lesson
      // and assume progress is updated by quiz completion
    }
  }, [lessonId, userProgress, loading])

  const handleQuizComplete = (xpEarned: number, badgesEarned: string[]) => {
    const oldLevel = userProgress?.level || 0
    addXp(xpEarned)
    badgesEarned.forEach((badge) => addBadge(badge))
    markLessonCompleted(lesson.id) // Mark lesson as completed and update modulesCompleted

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
      <div className="flex min-h-[calc(100svh-130px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (isLocked) {
    return (
      <div className="flex min-h-[calc(100svh-130px)] items-center justify-center p-4 text-center">
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Lesson Locked!</h2>
          <p className="text-lg text-muted-foreground">
            You need to reach Level {lesson.level} to unlock this lesson. Keep learning!
          </p>
          <Button className="mt-6" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold animate-fadeIn">{lesson.title}</h1>
      <p className="text-lg text-muted-foreground animate-fadeIn animation-delay-100">{lesson.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)]">
        <Card className="flex flex-col animate-slideInFromBottom">
          <CardContent className="p-0 flex-grow overflow-hidden">
            <LessonContent content={lesson.content} diagramUrl={lesson.diagramUrl} />
          </CardContent>
        </Card>
        <Card className="flex flex-col animate-slideInFromBottom animation-delay-200">
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
