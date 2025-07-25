"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { DebateSession } from "@/lib/types"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"
import { AiFeedbackPanel } from "@/components/ui/ai-feedback-panel"

interface FeedbackTabsProps {
  sessions: DebateSession[]
  loading: boolean
}

export function FeedbackTabs({ sessions, loading }: FeedbackTabsProps) {
  if (loading) {
    return (
      <Card className="w-full h-[400px] animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" /> Loading Feedback...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[calc(100%-80px)]">
          <div className="h-full w-full bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  const recentSessions = sessions.slice(0, 5) // Show up to 5 recent sessions
  const bestPerformingRounds = [...sessions].sort((a, b) => b.score - a.score).slice(0, 3)
  const areasToImprove = sessions
    .flatMap((session) => session.finalFeedback.suggestions)
    .filter((v, i, a) => a.indexOf(v) === i) // Unique suggestions

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle>Detailed Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">Recent Sessions</TabsTrigger>
            <TabsTrigger value="best">Best Rounds</TabsTrigger>
            <TabsTrigger value="improve">Areas to Improve</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="mt-4">
            <ScrollArea className="h-[300px] pr-4">
              {recentSessions.length > 0 ? (
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <Card key={session.id} className="p-4">
                      <h3 className="font-semibold text-lg">{session.motion}</h3>
                      <p className="text-sm text-muted-foreground">
                        {session.userRole} | {format(new Date(session.date), "PPP")}
                      </p>
                      <AiFeedbackPanel feedback={session.finalFeedback} />
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No recent sessions to display.</p>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="best" className="mt-4">
            <ScrollArea className="h-[300px] pr-4">
              {bestPerformingRounds.length > 0 ? (
                <div className="space-y-4">
                  {bestPerformingRounds.map((session) => (
                    <Card key={session.id} className="p-4">
                      <h3 className="font-semibold text-lg">{session.motion}</h3>
                      <p className="text-sm text-muted-foreground">
                        Score: {session.score}/100 | {session.userRole} | {format(new Date(session.date), "PPP")}
                      </p>
                      <AiFeedbackPanel feedback={session.finalFeedback} />
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No best performing rounds yet.</p>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="improve" className="mt-4">
            <ScrollArea className="h-[300px] pr-4">
              {areasToImprove.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-2">Common Improvement Areas:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {areasToImprove.map((tip, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No specific areas to improve detected. Keep up the great work!
                </p>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
