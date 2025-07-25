import { UserProfile } from "@/components/dashboard/user-profile"
import { ProgressOverview } from "@/components/dashboard/progress-overview"
import { NavigationCards } from "@/components/dashboard/navigation-cards"
import { ContinueCard } from "@/components/dashboard/continue-card"

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold animate-fadeIn">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserProfile />
        </div>
        <div className="lg:col-span-1">
          <ContinueCard />
        </div>
      </div>
      <ProgressOverview />
      <NavigationCards />
    </main>
  )
}
