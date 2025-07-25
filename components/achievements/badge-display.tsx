"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Loader2 } from "lucide-react"
import { useUserProgress } from "@/hooks/use-user-progress"
import { cn } from "@/utils/cn"

export function BadgeDisplay() {
  const { userProgress, loading } = useUserProgress()

  if (loading) {
    return (
      <Card className="w-full animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Badges...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!userProgress) {
    return <Card>Error loading badges.</Card>
  }

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-6 w-6 text-yellow-500" /> Earned Badges
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {userProgress.badges.length > 0 ? (
          userProgress.badges.map((badge, index) => (
            <Badge
              key={index}
              className={cn(
                "px-4 py-2 text-base bg-yellow-100 text-yellow-800 border-yellow-300 animate-popIn",
                { "animation-delay-100": index === 0 },
                { "animation-delay-200": index === 1 },
                { "animation-delay-300": index === 2 },
              )}
            >
              {badge}
            </Badge>
          ))
        ) : (
          <p className="text-muted-foreground">No badges earned yet. Keep learning and practicing!</p>
        )}
      </CardContent>
    </Card>
  )
}
