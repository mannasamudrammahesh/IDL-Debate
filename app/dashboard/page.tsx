import { UserProfile } from "@/components/dashboard/user-profile"
import { ProgressOverview } from "@/components/dashboard/progress-overview"
import { NavigationCards } from "@/components/dashboard/navigation-cards"

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <UserProfile />
      <ProgressOverview />
      <NavigationCards />
    </main>
  )
}
