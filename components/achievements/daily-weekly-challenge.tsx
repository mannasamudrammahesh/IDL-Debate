"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2, Trophy } from "lucide-react"
import { mockChallenges } from "@/lib/data"
import { useUserProgress } from "@/hooks/use-user-progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"

export function DailyWeeklyChallenges() {
  const { userProgress, loading } = useUserProgress()

  if (loading) {
    return (
      <Card className="w-full animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Challenges...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />
          ))}
        </CardContent>
      </Card>
    )
  }

  const dailyChallenges = mockChallenges.filter((c) => c.type === "daily")
  const weeklyChallenges = mockChallenges.filter((c) => c.type === "weekly")

  // For demo, we'll just use the mockChallenges' completed status.
  // In a real app, this would be dynamically checked against user progress.

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-green-500" /> Daily & Weekly Challenges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Daily Challenges</h3>
          <div className="space-y-3">
            {dailyChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border",
                  challenge.completed ? "bg-green-50/50 dark:bg-green-900/20" : "bg-muted/20",
                )}
              >
                <div>
                  <p className="font-medium">{challenge.name}</p>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  <p className="text-xs text-primary mt-1">
                    +{challenge.xpReward} XP {challenge.badgeReward && `+ ${challenge.badgeReward} Badge`}
                  </p>
                </div>
                {challenge.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Weekly Challenges</h3>
          <div className="space-y-3">
            {weeklyChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border",
                  challenge.completed ? "bg-green-50/50 dark:bg-green-900/20" : "bg-muted/20",
                )}
              >
                <div>
                  <p className="font-medium">{challenge.name}</p>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  <p className="text-xs text-primary mt-1">
                    +{challenge.xpReward} XP {challenge.badgeReward && `+ ${challenge.badgeReward} Badge`}
                  </p>
                </div>
                {challenge.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
