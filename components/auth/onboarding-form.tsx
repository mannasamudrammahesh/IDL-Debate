"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { useUserProgress } from "@/hooks/use-user-progress"
import type { UserLevel, DebateExperience } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

export function OnboardingForm() {
  const [nickname, setNickname] = useState("")
  const [avatar, setAvatar] = useState("/placeholder.svg?height=128&width=128")
  const [gradeLevel, setGradeLevel] = useState<UserLevel | "">("")
  const [experienceLevel, setExperienceLevel] = useState<DebateExperience | "">("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { updateProgress } = useUserProgress()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nickname || !gradeLevel || !experienceLevel) {
      setError("Please fill in all fields.")
      return
    }

    setLoading(true)
    setError(null)
    // Simulate API call to save onboarding data
    await new Promise((resolve) => setTimeout(resolve, 1500))

    updateProgress({
      nickname,
      avatar,
      gradeLevel: gradeLevel as UserLevel,
      experienceLevel: experienceLevel as DebateExperience,
    })

    console.log("Onboarding complete:", { nickname, avatar, gradeLevel, experienceLevel })
    setLoading(false)
    router.push("/dashboard")
  }

  return (
    <Card className="w-full max-w-md animate-fadeIn">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Welcome to DebateQuest!</CardTitle>
        <CardDescription className="text-center">
          Tell us a bit about yourself to personalize your learning journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2 text-center">
            <Label htmlFor="avatar-upload" className="text-base cursor-pointer">
              Choose your Avatar
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
                disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="grade-level" className="text-base">
              What is your current grade level?
            </Label>
            <RadioGroup
              value={gradeLevel}
              onValueChange={(value: UserLevel) => setGradeLevel(value)}
              className="flex flex-col space-y-2"
              disabled={loading}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="middle-school" id="middle-school" />
                <Label htmlFor="middle-school">Middle School</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high-school" id="high-school" />
                <Label htmlFor="high-school">High School</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="experience-level" className="text-base">
              What is your debate experience level?
            </Label>
            <RadioGroup
              value={experienceLevel}
              onValueChange={(value: DebateExperience) => setExperienceLevel(value)}
              className="flex flex-col space-y-2"
              disabled={loading}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner">Beginner (New to debate)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate">Intermediate (Some experience)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced">Advanced (Experienced debater)</Label>
              </div>
            </RadioGroup>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Start My Journey"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
