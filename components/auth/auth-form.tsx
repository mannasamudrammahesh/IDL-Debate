"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ChromeIcon as Google } from "lucide-react"

interface AuthFormProps {
  type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log(`${type} with:`, { email, password })
    setLoading(false)

    if (type === "register") {
      // Simulate successful registration, redirect to onboarding
      router.push("/onboarding")
    } else {
      // Simulate successful login, redirect to dashboard
      router.push("/dashboard")
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    // Simulate Google Auth
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Google Auth initiated")
    setLoading(false)
    if (type === "register") {
      router.push("/onboarding")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{type === "login" ? "Login" : "Register"}</CardTitle>
        <CardDescription className="text-center">
          {type === "login" ? "Enter your credentials to access your account" : "Create your account to start learning"}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-6">
          <Button variant="outline" onClick={handleGoogleAuth} disabled={loading}>
            <Google className="mr-2 h-4 w-4" />
            {type === "login" ? "Login with Google" : "Register with Google"}
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? type === "login"
                ? "Logging in..."
                : "Registering..."
              : type === "login"
                ? "Login"
                : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
