import { BadgeDisplay } from "@/components/achievements/badge-display"
import { StatsSummary } from "@/components/achievements/stats-summary"

export default function AchievementsPage() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Your Achievements</h1>
      <p className="text-lg text-muted-foreground">Celebrate your progress and see how far you've come!</p>
      <BadgeDisplay />
      <StatsSummary />
    </main>
  )
}
