"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ChromeIcon as Google } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useUserProgress } from "@/hooks/use-user-progress"

interface AuthFormProps {
  type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login, register } = useAuth()
  const { userProgress } = useUserProgress()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let success = false
      if (type === "login") {
        success = await login(email, password)
      } else {
        success = await register(email, password)
      }

      if (success) {
        if (type === "register" || !userProgress?.gradeLevel) {
          // If registering or existing user without onboarding data, go to onboarding
          router.push("/onboarding")
        } else {
          router.push("/dashboard")
        }
      } else {
        setError(type === "login" ? "Invalid credentials." : "Registration failed. Email might be in use.")
      }
    } catch (err) {
      setError("An unexpected error occurred.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    setError(null)
    // Simulate Google Auth
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Google Auth initiated")
    // In a real app, this would involve Firebase/Supabase Google OAuth
    // For demo, assume success and redirect
    const mockUser = { id: `google-user-${Date.now()}`, email: "google@example.com" }
    localStorage.setItem("debatequest_user", JSON.stringify(mockUser)) // Mock login
    setLoading(false)

    if (type === "register" || !userProgress?.gradeLevel) {
      router.push("/onboarding")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <Card className="w-full max-w-md animate-fadeIn">
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
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
        {type === "login" && (
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        )}
        {type === "register" && (
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
