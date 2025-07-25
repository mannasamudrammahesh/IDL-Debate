"use client"

import { ArgumentStrengthChart } from "@/components/feedback-reports/argument-strength-chart"
import { FallacyHeatmap } from "@/components/feedback-reports/fallacy-heatmap"
import { FeedbackTabs } from "@/components/feedback-reports/feedback-tabs"
import { ImprovementTips } from "@/components/feedback-reports/improvement-tips"
import { mockDebateSessions } from "@/lib/data"
import { useState, useEffect } from "react"

export default function FeedbackReportsPage() {
  const [sessions, setSessions] = useState(mockDebateSessions)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching sessions from a database
    const timer = setTimeout(() => {
      setSessions(mockDebateSessions)
      setLoading(false)
    }, 1000) // Simulate network delay
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold animate-fadeIn">Feedback Reports</h1>
      <p className="text-lg text-muted-foreground animate-fadeIn animation-delay-100">
        Analyze your debate performance and identify areas for growth.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ArgumentStrengthChart sessions={sessions} loading={loading} />
        <div className="flex flex-col gap-6">
          <FallacyHeatmap sessions={sessions} loading={loading} />
          <ImprovementTips sessions={sessions} loading={loading} />
        </div>
      </div>

      <FeedbackTabs sessions={sessions} loading={loading} />
    </main>
  )
}
