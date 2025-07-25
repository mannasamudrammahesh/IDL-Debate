"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play } from "lucide-react"
import { useUserProgress } from "@/hooks/use-user-progress"
import { mockLessons } from "@/lib/data"
import { Loader2 } from "lucide-react"

export function ContinueCard() {
  const { userProgress, loading } = useUserProgress()

  if (loading) {
    return (
      <Card className="w-full animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  if (!userProgress || !userProgress.lastLessonId) {
    return (
      <Card className="w-full animate-fadeIn">
        <CardHeader>
          <CardTitle>Start Your Learning Journey!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">It looks like you haven't started any lessons yet.</p>
          <Button asChild>
            <Link href="/learn">Explore Modules</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const lastLesson = mockLessons.find((lesson) => lesson.id === userProgress.lastLessonId)

  if (!lastLesson) {
    return (
      <Card className="w-full animate-fadeIn">
        <CardHeader>
          <CardTitle>Start Your Learning Journey!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">It looks like you haven't started any lessons yet.</p>
          <Button asChild>
            <Link href="/learn">Explore Modules</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const progress = userProgress.lastLessonProgress || 0
  const isCompleted = progress === 100

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle>Continue Where You Left Off</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-xl font-semibold">{lastLesson.title}</h3>
        <p className="text-muted-foreground text-sm">{lastLesson.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span>Lesson Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <Button asChild disabled={isCompleted}>
          <Link href={`/learn/${lastLesson.id}`}>
            <Play className="h-4 w-4 mr-2" /> {isCompleted ? "Completed" : "Resume Lesson"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
