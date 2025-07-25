"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Loader2 } from "lucide-react"
import { useUserProgress } from "@/hooks/use-user-progress"
import type { UserLevel, DebateExperience } from "@/lib/types"

export function ProfileSettings() {
  const { userProgress, loading, updateProgress, resetProgress } = useUserProgress()
  const [nickname, setNickname] = useState(userProgress?.nickname || "")
  const [avatar, setAvatar] = useState(userProgress?.avatar || "/placeholder.svg?height=128&width=128")
  const [gradeLevel, setGradeLevel] = useState<UserLevel | "">(userProgress?.gradeLevel || "")
  const [experienceLevel, setExperienceLevel] = useState<DebateExperience | "">(userProgress?.experienceLevel || "")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  React.useEffect(() => {
    if (userProgress) {
      setNickname(userProgress.nickname)
      setAvatar(userProgress.avatar)
      setGradeLevel(userProgress.gradeLevel)
      setExperienceLevel(userProgress.experienceLevel)
    }
  }, [userProgress])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage(null)

    if (!nickname || !gradeLevel || !experienceLevel) {
      setSaveMessage("Please fill in all required fields.")
      setIsSaving(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    updateProgress({
      nickname,
      avatar,
      gradeLevel: gradeLevel as UserLevel,
      experienceLevel: experienceLevel as DebateExperience,
    })

    setIsSaving(false)
    setSaveMessage("Profile updated successfully!")
    setTimeout(() => setSaveMessage(null), 3000)
  }

  const handleResetProgress = async () => {
    if (window.confirm("Are you sure you want to reset all your progress? This action cannot be undone.")) {
      setIsSaving(true) // Use saving state for reset too
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate reset time
      resetProgress()
      setIsSaving(false)
      setSaveMessage("Progress reset successfully!")
      setTimeout(() => setSaveMessage(null), 3000)
    }
  }

  if (loading) {
    return (
      <Card className="w-full animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Profile Settings...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-20 w-20 rounded-full bg-gray-200 mx-auto animate-pulse" />
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
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
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form onSubmit={handleSave} className="grid gap-6">
          <div className="grid gap-2 text-center">
            <Label htmlFor="avatar-upload" className="text-base cursor-pointer">
              Change Avatar
            </Label>
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden group">
              <Avatar className="w-full h-full">
                <AvatarImage src={avatar || "/placeholder.svg"} alt="User Avatar" />
                <AvatarFallback className="text-4xl">{nickname.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleAvatarChange}
                disabled={isSaving}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              type="text"
              placeholder="DebateChamp"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              disabled={isSaving}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="grade-level" className="text-base">
              Grade Level
            </Label>
            <RadioGroup
              value={gradeLevel}
              onValueChange={(value: UserLevel) => setGradeLevel(value)}
              className="flex flex-col space-y-2"
              disabled={isSaving}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="middle-school" id="middle-school-settings" />
                <Label htmlFor="middle-school-settings">Middle School</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high-school" id="high-school-settings" />
                <Label htmlFor="high-school-settings">High School</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="experience-level" className="text-base">
              Debate Experience Level
            </Label>
            <RadioGroup
              value={experienceLevel}
              onValueChange={(value: DebateExperience) => setExperienceLevel(value)}
              className="flex flex-col space-y-2"
              disabled={isSaving}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="beginner-settings" />
                <Label htmlFor="beginner-settings">Beginner</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="intermediate-settings" />
                <Label htmlFor="intermediate-settings">Intermediate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="advanced-settings" />
                <Label htmlFor="advanced-settings">Advanced</Label>
              </div>
            </RadioGroup>
          </div>

          {saveMessage && (
            <p
              className={`text-sm text-center ${saveMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}
            >
              {saveMessage}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </form>

        <div className="border-t pt-6 mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
          <Button variant="destructive" onClick={handleResetProgress} disabled={isSaving}>
            Reset All Progress
          </Button>
          <Button variant="outline" className="w-full bg-transparent" disabled={isSaving}>
            Delete Account (Mock)
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
