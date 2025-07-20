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

export function OnboardingForm() {
  const [gradeLevel, setGradeLevel] = useState<UserLevel | "">("")
  const [experienceLevel, setExperienceLevel] = useState<DebateExperience | "">("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { updateProgress } = useUserProgress()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gradeLevel || !experienceLevel) {
      alert("Please select both your grade level and debate experience.")
      return
    }

    setLoading(true)
    // Simulate API call to save onboarding data
    await new Promise((resolve) => setTimeout(resolve, 1500))

    updateProgress({
      gradeLevel: gradeLevel as UserLevel,
      experienceLevel: experienceLevel as DebateExperience,
    })

    console.log("Onboarding complete:", { gradeLevel, experienceLevel })
    setLoading(false)
    router.push("/dashboard")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Welcome to DebateQuest!</CardTitle>
        <CardDescription className="text-center">
          Tell us a bit about yourself to personalize your learning journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form onSubmit={handleSubmit} className="grid gap-6">
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
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Start My Journey"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
