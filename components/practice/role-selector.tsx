"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface RoleSelectorProps {
  onRoleSelect: (role: string, motion: string) => void
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState("")
  const [debateMotion, setDebateMotion] = useState("")

  const motions = [
    "Should school uniforms be mandatory?",
    "Is artificial intelligence a threat to humanity?",
    "Should social media companies be held responsible for misinformation?",
    "Is space exploration worth the cost?",
  ]

  const roles = [
    "Prime Minister (Affirmative)",
    "Leader of Opposition (Negative)",
    "Deputy Prime Minister (Affirmative)",
    "Deputy Leader of Opposition (Negative)",
  ]

  const handleSubmit = () => {
    if (selectedRole && debateMotion) {
      onRoleSelect(selectedRole, debateMotion)
    } else {
      alert("Please select a role and a debate motion.")
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Choose Your Debate</CardTitle>
        <CardDescription className="text-center">
          Select your role and a motion to begin your AI simulation.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label className="text-base">Select Your Role:</Label>
          <RadioGroup
            value={selectedRole}
            onValueChange={setSelectedRole}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {roles.map((role) => (
              <div
                key={role}
                className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted cursor-pointer"
              >
                <RadioGroupItem value={role} id={role.replace(/\s/g, "-").toLowerCase()} />
                <Label htmlFor={role.replace(/\s/g, "-").toLowerCase()} className="cursor-pointer">
                  {role}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="grid gap-2">
          <Label className="text-base">Choose a Debate Motion:</Label>
          <RadioGroup value={debateMotion} onValueChange={setDebateMotion} className="grid grid-cols-1 gap-4">
            {motions.map((motion) => (
              <div
                key={motion}
                className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted cursor-pointer"
              >
                <RadioGroupItem value={motion} id={motion.replace(/\s/g, "-").toLowerCase()} />
                <Label htmlFor={motion.replace(/\s/g, "-").toLowerCase()} className="cursor-pointer">
                  {motion}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Start Debate
        </Button>
      </CardContent>
    </Card>
  )
}
