"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { DebateSession } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface ArgumentStrengthChartProps {
  sessions: DebateSession[]
  loading: boolean
}

export function ArgumentStrengthChart({ sessions, loading }: ArgumentStrengthChartProps) {
  if (loading) {
    return (
      <Card className="w-full h-80 animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Chart...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[calc(100%-80px)]">
          <div className="h-full w-full bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  const chartData = sessions.map((session) => ({
    name: session.motion.substring(0, 20) + "...", // Shorten motion for display
    strength: session.finalFeedback.argumentStrength,
  }))

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle>Argument Strength Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
            <YAxis domain={[0, 10]} label={{ value: "Strength (0-10)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="strength" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
