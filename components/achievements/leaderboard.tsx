"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { mockUserProgress } from "@/lib/data" // Using mock for simplicity

interface LeaderboardEntry {
  id: string
  nickname: string
  avatar: string
  level: number
  xp: number
}

export function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching leaderboard data
    const timer = setTimeout(() => {
      const mockLeaderboard: LeaderboardEntry[] = [
        { ...mockUserProgress, nickname: "DebateMaster", level: 5, xp: 950 },
        { id: "user-2", nickname: "ArguePro", avatar: "/placeholder.svg?height=40&width=40", level: 4, xp: 780 },
        { id: "user-3", nickname: "LogicWhiz", avatar: "/placeholder.svg?height=40&width=40", level: 4, xp: 720 },
        { id: "user-4", nickname: "RebuttalKing", avatar: "/placeholder.svg?height=40&width=40", level: 3, xp: 550 },
        { id: "user-5", nickname: "FallacyHunter", avatar: "/placeholder.svg?height=40&width=40", level: 3, xp: 510 },
      ].sort((a, b) => b.xp - a.xp) // Sort by XP
      setLeaderboardData(mockLeaderboard)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Card className="w-full h-80 animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Leaderboard...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[calc(100%-80px)]">
          <div className="h-full w-full bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-yellow-500" /> Global Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Level</TableHead>
              <TableHead className="text-right">XP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((entry, index) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={entry.avatar || "/placeholder.svg"} alt={entry.nickname} />
                      <AvatarFallback>{entry.nickname.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{entry.nickname}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{entry.level}</TableCell>
                <TableCell className="text-right">{entry.xp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
