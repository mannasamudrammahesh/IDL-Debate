"use client"

import { LessonCard } from "@/components/learn/lesson-card"
import { mockLessons } from "@/lib/data"
import { useUserProgress } from "@/hooks/use-user-progress"
import { Loader2 } from "lucide-react"

export default function LearnModulesPage() {
  const { userProgress, loading } = useUserProgress()

  if (loading) {
    return (
      <div className="flex min-h-[calc(100svh-130px)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  const userLevel = userProgress?.level || 1

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold animate-fadeIn">Learning Modules</h1>
      <p className="text-lg text-muted-foreground animate-fadeIn animation-delay-100">
        Sharpen your debate skills with our interactive lessons.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLessons.map((lesson, index) => (
          <LessonCard key={lesson.id} lesson={lesson} isLocked={lesson.level > userLevel} />
        ))}
      </div>
    </main>
  )
}
