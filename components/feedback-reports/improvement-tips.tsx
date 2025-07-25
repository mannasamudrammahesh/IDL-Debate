"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Loader2 } from "lucide-react"
import type { DebateSession } from "@/lib/types"

interface ImprovementTipsProps {
  sessions: DebateSession[]
  loading: boolean
}

export function ImprovementTips({ sessions, loading }: ImprovementTipsProps) {
  if (loading) {
    return (
      <Card className="w-full h-60 animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Tips...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[calc(100%-80px)]">
          <div className="h-full w-full bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  const allSuggestions = sessions.flatMap((session) => session.finalFeedback.suggestions)
  const uniqueSuggestions = Array.from(new Set(allSuggestions))

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-500" /> AI Improvement Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {uniqueSuggestions.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {uniqueSuggestions.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No specific improvement tips at the moment. Keep up the great work!</p>
        )}
      </CardContent>
    </Card>
  )
}
