"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useUserProgress } from "@/hooks/use-user-progress"
import type { UserLevel, DebateExperience } from "@/lib/types"
import { Loader2 } from "lucide-react"

export function ProfileSettings() {
  const { userProgress, loading, updateProgress, resetProgress } = useUserProgress()
  const [nickname, setNickname] = useState(userProgress?.nickname || "")
  const [avatarUrl, setAvatarUrl] = useState(userProgress?.avatar || "")
  const [gradeLevel, setGradeLevel] = useState<UserLevel>(userProgress?.gradeLevel || "high-school")
  const [experienceLevel, setExperienceLevel] = useState<DebateExperience>(
    userProgress?.experienceLevel || "intermediate",
  )
  const [isSaving, setIsSaving] = useState(false)

  // Update local state when userProgress changes (e.g., after initial load)
  useState(() => {
    if (userProgress) {
      setNickname(userProgress.nickname)
      setAvatarUrl(userProgress.avatar)
      setGradeLevel(userProgress.gradeLevel)
      setExperienceLevel(userProgress.experienceLevel)
    }
  }, [userProgress])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    updateProgress({
      nickname,
      avatar: avatarUrl,
      gradeLevel,
      experienceLevel,
    })
    setIsSaving(false)
    alert("Profile updated successfully!")
  }

  const handleResetProgress = async () => {
    if (confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
      setIsSaving(true) // Use isSaving for this too
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate reset
      resetProgress()
      setIsSaving(false)
      alert("Your progress has been reset.")
      // Optionally redirect or refresh to show reset state
      window.location.reload()
    }
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Settings...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  if (!userProgress) {
    return <Card>Error loading profile settings.</Card>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Manage your personal information and preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={nickname} />
              <AvatarFallback>{nickname.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <Label htmlFor="avatar-url">Avatar URL</Label>
              <Input
                id="avatar-url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="/placeholder.svg?height=100&width=100"
                disabled={isSaving}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} disabled={isSaving} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="grade-level">Grade Level</Label>
            <RadioGroup
              value={gradeLevel}
              onValueChange={(value: UserLevel) => setGradeLevel(value)}
              className="flex flex-col space-y-2"
              disabled={isSaving}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="middle-school" id="grade-middle" />
                <Label htmlFor="grade-middle">Middle School</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high-school" id="grade-high" />
                <Label htmlFor="grade-high">High School</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="experience-level">Debate Experience Level</Label>
            <RadioGroup
              value={experienceLevel}
              onValueChange={(value: DebateExperience) => setExperienceLevel(value)}
              className="flex flex-col space-y-2"
              disabled={isSaving}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="exp-beginner" />
                <Label htmlFor="exp-beginner">Beginner</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="exp-intermediate" />
                <Label htmlFor="exp-intermediate">Intermediate</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-destructive/20 space-y-4">
          <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">
            Resetting your progress will delete all your earned XP, levels, and badges. This action cannot be undone.
          </p>
          <Button variant="destructive" onClick={handleResetProgress} disabled={isSaving}>
            Reset All Progress
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t space-y-4">
          <h3 className="text-lg font-semibold">Account Actions</h3>
          <Button variant="outline" onClick={() => alert("Logging out... (Simulated)")} disabled={isSaving}>
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
