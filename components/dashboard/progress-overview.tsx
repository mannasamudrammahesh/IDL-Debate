"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, MessageSquare, Lightbulb } from "lucide-react"
import { useUserProgress } from "@/hooks/use-user-progress"
import { Loader2 } from "lucide-react"

export function ProgressOverview() {
  const { userProgress, loading } = useUserProgress()

  if (loading) {
    return (
      <Card className="w-full animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Progress...
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-24 bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  if (!userProgress) {
    return <Card>Error loading progress overview.</Card>
  }

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-4 rounded-lg border p-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <div>
            <div className="text-2xl font-bold">{userProgress.modulesCompleted}</div>
            <div className="text-sm text-muted-foreground">Modules Completed</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-lg border p-4">
          <MessageSquare className="h-8 w-8 text-blue-500" />
          <div>
            <div className="text-2xl font-bold">{userProgress.debatesSimulated}</div>
            <div className="text-sm text-muted-foreground">Debates Simulated</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-lg border p-4">
          <Lightbulb className="h-8 w-8 text-yellow-500" />
          <div>
            <div className="text-2xl font-bold">{userProgress.fallaciesDetected}</div>
            <div className="text-sm text-muted-foreground">Fallacies Detected</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
