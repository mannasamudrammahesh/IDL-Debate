import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, Play } from "lucide-react"
import type { Lesson } from "@/lib/types"
import { cn } from "@/utils/cn"

interface LessonCardProps {
  lesson: Lesson
  isLocked?: boolean
}

export function LessonCard({ lesson, isLocked = false }: LessonCardProps) {
  return (
    <Card
      className={cn("flex flex-col justify-between h-full animate-slideInFromBottom", {
        "opacity-60 cursor-not-allowed": isLocked,
      })}
    >
      <CardHeader>
        <CardTitle className="text-xl">{lesson.title}</CardTitle>
        <p className="text-sm text-muted-foreground">Level {lesson.level}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{lesson.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span>Progress</span>
            <span>{lesson.progress}%</span>
          </div>
          <Progress value={lesson.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        {lesson.completed ? (
          <div className="flex items-center text-green-600 text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-1" /> Completed
          </div>
        ) : (
          <Button asChild size="sm" disabled={isLocked}>
            <Link href={`/learn/${lesson.id}`}>
              <Play className="h-4 w-4 mr-2" /> {lesson.progress > 0 ? "Resume" : "Start"}
            </Link>
          </Button>
        )}
        {isLocked && <span className="text-sm text-red-500">Locked</span>}
      </CardFooter>
    </Card>
  )
}
