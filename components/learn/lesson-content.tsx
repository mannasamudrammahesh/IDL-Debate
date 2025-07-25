import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LessonContentProps {
  content: string
  diagramUrl?: string
}

export function LessonContent({ content, diagramUrl }: LessonContentProps) {
  return (
    <ScrollArea className="h-full p-4">
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
        {diagramUrl && (
          <div className="mt-6 text-center">
            <Image
              src={diagramUrl || "/placeholder.svg"}
              alt="Lesson Diagram"
              width={500}
              height={300}
              className="mx-auto rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
