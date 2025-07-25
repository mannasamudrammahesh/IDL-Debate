"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useUserProgress } from "@/hooks/use-user-progress"
import { Loader2, Flame } from "lucide-react"
import { cn } from "@/utils/cn"

export function UserProfile() {
  const { userProgress, loading } = useUserProgress()

  if (loading) {
    return (
      <Card className="w-full animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Profile...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!userProgress) {
    return <Card>Error loading user profile.</Card>
  }

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle>Welcome, {userProgress.nickname}!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userProgress.avatar || "/placeholder.svg"} alt={userProgress.nickname} />
            <AvatarFallback className="text-3xl">{userProgress.nickname.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-bold">Level {userProgress.level} Speaker</h3>
            <p className="text-muted-foreground">
              {userProgress.gradeLevel} - {userProgress.experienceLevel}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>XP Progress</span>
            <span>{userProgress.xp % 200}/200 XP</span>
          </div>
          <Progress value={(userProgress.xp % 200) / 2} className="h-3" />
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Badges Earned</h4>
          <div className="flex flex-wrap gap-2">
            {userProgress.badges.length > 0 ? (
              userProgress.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                  {badge}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No badges yet. Keep learning!</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Flame
            className={cn("h-5 w-5", userProgress.weeklyStreak > 0 ? "text-orange-500" : "text-muted-foreground")}
          />
          <span>Weekly Streak: {userProgress.weeklyStreak} days</span>
        </div>
      </CardContent>
    </Card>
  )
}
