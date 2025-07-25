"use client"

import { ProfileSettings } from "@/components/settings/profile-settings"
import { ThemeToggle } from "@/components/settings/theme-toggle"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function SettingsPage() {
  const { logout } = useAuth()
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold animate-fadeIn">Settings & Profile</h1>
      <p className="text-lg text-muted-foreground animate-fadeIn animation-delay-100">
        Manage your account, personalize your experience, and adjust preferences.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileSettings />
        <div className="flex flex-col gap-6">
          <ThemeToggle />
          <Button
            variant="outline"
            size="lg"
            className="w-full animate-fadeIn animation-delay-300 bg-transparent"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 mr-2" /> Logout
          </Button>
        </div>
      </div>
    </main>
  )
}
