"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2 } from "lucide-react"
import { mockDebateSessions } from "@/lib/data"
import { useState, useEffect } from "react"

type StatsSummaryProps = {}

export function StatsSummary({}: StatsSummaryProps) {
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

  if (loading) {
    return (
      <Card className="w-full h-80 animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Stats...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[calc(100%-80px)]">
          <div className="h-full w-full bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  const scoreData = sessions.map((session) => ({
    name: session.date,
    score: session.score,
  }))

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle>Debate Performance Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={scoreData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} label={{ value: "Score (0-100)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
