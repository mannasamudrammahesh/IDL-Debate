import { ProfileSettings } from "@/components/settings/profile-settings"
import { ThemeToggle } from "@/components/settings/theme-toggle"

export default function SettingsPage() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-lg text-muted-foreground">Adjust your preferences and manage your account.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileSettings />
        <ThemeToggle />
      </div>
    </main>
  )
}
