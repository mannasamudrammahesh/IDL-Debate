import { LessonCard } from "@/components/learn/lesson-card"
import { mockLessons } from "@/lib/data"

export default function LearnModulesPage() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Learning Modules</h1>
      <p className="text-lg text-muted-foreground">Sharpen your debate skills with our interactive lessons.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </main>
  )
}
