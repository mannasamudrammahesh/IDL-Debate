"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Loader2 } from "lucide-react"
import type { DebateSession } from "@/lib/types"
import { cn } from "@/utils/cn"

interface FallacyHeatmapProps {
  sessions: DebateSession[]
  loading: boolean
}

export function FallacyHeatmap({ sessions, loading }: FallacyHeatmapProps) {
  if (loading) {
    return (
      <Card className="w-full h-60 animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Heatmap...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[calc(100%-80px)]">
          <div className="h-full w-full bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  const fallacyCounts: { [key: string]: number } = {}
  sessions.forEach((session) => {
    session.finalFeedback.fallaciesDetected.forEach((fallacy) => {
      if (fallacy !== "No Fallacies Detected") {
        fallacyCounts[fallacy] = (fallacyCounts[fallacy] || 0) + 1
      }
    })
  })

  const sortedFallacies = Object.entries(fallacyCounts).sort(([, a], [, b]) => b - a)

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-500" /> Fallacy Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedFallacies.length > 0 ? (
          <div className="grid gap-2">
            {sortedFallacies.map(([fallacy, count]) => (
              <div key={fallacy} className="flex items-center justify-between text-sm">
                <span className="font-medium">{fallacy}</span>
                <span
                  className={cn("px-2 py-1 rounded-full text-white", {
                    "bg-red-400": count <= 2,
                    "bg-red-600": count > 2 && count <= 5,
                    "bg-red-800": count > 5,
                  })}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No fallacies detected in your recent sessions. Great job!</p>
        )}
      </CardContent>
    </Card>
  )
}
