"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockAiFeedback, mockDebateMessages } from "@/lib/data"
import { AiFeedbackPanel } from "@/components/ui/ai-feedback-panel"
import type { DebateMessage, AiFeedback } from "@/lib/types"
import { Timer, RefreshCcw, MessageCircleQuestion } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface DebateChatProps {
  userRole: string
  debateMotion: string
}

export function DebateChat({ userRole, debateMotion }: DebateChatProps) {
  const [messages, setMessages] = useState<DebateMessage[]>(mockDebateMessages)
  const [input, setInput] = useState("")
  const [currentPhase, setCurrentPhase] = useState<"Opening" | "Rebuttal" | "Summary">("Opening")
  const [timer, setTimer] = useState(180) // 3 minutes per round
  const [isRunning, setIsRunning] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [aiFeedback, setAiFeedback] = useState<AiFeedback | null>(null)
  const [poiEnabled, setPoiEnabled] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize debate
    setMessages([
      {
        id: "initial-ai",
        role: "ai",
        content: `Welcome to the debate! The motion is: "${debateMotion}". You are the ${userRole}. Please present your opening statement.`,
        timestamp: new Date(),
      },
    ])
    setIsRunning(true) // Start timer automatically
  }, [userRole, debateMotion])

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setIsRunning(false)
            handleRoundEnd()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    const newUserMessage: DebateMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newUserMessage])
    setInput("")

    // Simulate AI response and feedback
    // In a real app, this would call an OpenAI API route
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const aiResponse: DebateMessage = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      content: "Thank you for your point. I will now respond to your argument...",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, aiResponse])

    // Simulate AI feedback after user's turn
    setAiFeedback(mockAiFeedback)
    setShowFeedback(true)
  }

  const handleRoundEnd = () => {
    // Logic to transition to next phase or end debate
    if (currentPhase === "Opening") {
      setCurrentPhase("Rebuttal")
      setTimer(120) // 2 minutes for rebuttal
      setIsRunning(true)
      setMessages((prev) => [
        ...prev,
        {
          id: "phase-change-1",
          role: "ai",
          content: "Time for Rebuttals! Please present your counter-arguments.",
          timestamp: new Date(),
        },
      ])
    } else if (currentPhase === "Rebuttal") {
      setCurrentPhase("Summary")
      setTimer(60) // 1 minute for summary
      setIsRunning(true)
      setMessages((prev) => [
        ...prev,
        {
          id: "phase-change-2",
          role: "ai",
          content: "Final round: Summary! Conclude your case.",
          timestamp: new Date(),
        },
      ])
    } else {
      setIsRunning(false)
      setMessages((prev) => [
        ...prev,
        { id: "debate-end", role: "ai", content: "Debate concluded! Analyzing performance...", timestamp: new Date() },
      ])
      // Final AI feedback or score
      setAiFeedback(mockAiFeedback) // Use mock feedback for demo
      setShowFeedback(true)
    }
  }

  const handleRoleSwitch = () => {
    // Simulate role switch logic
    alert("Role switch initiated! (Feature under development)")
  }

  const handlePoiToggle = (checked: boolean) => {
    setPoiEnabled(checked)
    alert(`Point of Information ${checked ? "enabled" : "disabled"}. (Feature under development)`)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-150px)]">
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b p-4">
          <CardTitle className="text-xl">Debate Arena: {debateMotion}</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-lg font-semibold">
              <Timer className="h-5 w-5" /> {formatTime(timer)}
            </div>
            <Button variant="outline" size="sm" onClick={handleRoleSwitch} title="Switch Role">
              <RefreshCcw className="h-4 w-4" />
              <span className="sr-only">Switch Role</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <p className="font-semibold text-xs mb-1">{msg.role === "user" ? "You" : "AI Opponent"}</p>
                    <p>{msg.content}</p>
                    <p className="text-xs text-right mt-1 opacity-75">{msg.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              placeholder="Type your argument..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
              disabled={!isRunning}
            />
            <Button type="submit" disabled={!isRunning}>
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>

      <div className="lg:col-span-1 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Debate Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <span className="font-semibold">Your Role:</span> {userRole}
            </p>
            <p>
              <span className="font-semibold">Motion:</span> {debateMotion}
            </p>
            <p>
              <span className="font-semibold">Current Phase:</span> {currentPhase}
            </p>
            <div className="flex items-center justify-between">
              <Label htmlFor="poi-mode" className="flex items-center gap-2">
                <MessageCircleQuestion className="h-5 w-5" /> Point of Information (POI)
              </Label>
              <Switch id="poi-mode" checked={poiEnabled} onCheckedChange={handlePoiToggle} />
            </div>
          </CardContent>
        </Card>

        {showFeedback && aiFeedback && <AiFeedbackPanel feedback={aiFeedback} />}
      </div>
    </div>
  )
}
