"use client"

import { useState } from "react"
import { RoleSelector } from "@/components/practice/role-selector"
import { DebateChat } from "@/components/practice/debate-chat"

export default function PracticeArenaPage() {
  const [debateStarted, setDebateStarted] = useState(false)
  const [userRole, setUserRole] = useState("")
  const [debateMotion, setDebateMotion] = useState("")

  const handleRoleSelect = (role: string, motion: string) => {
    setUserRole(role)
    setDebateMotion(motion)
    setDebateStarted(true)
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold animate-fadeIn">Practice Arena</h1>
      <p className="text-lg text-muted-foreground animate-fadeIn animation-delay-100">
        Simulate debates with AI opponents and get instant feedback.
      </p>

      {!debateStarted ? (
        <RoleSelector onRoleSelect={handleRoleSelect} />
      ) : (
        <DebateChat userRole={userRole} debateMotion={debateMotion} />
      )}
    </main>
  )
}
