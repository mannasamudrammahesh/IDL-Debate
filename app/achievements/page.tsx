import { BadgeDisplay } from "@/components/achievements/badge-display"
import { StatsSummary } from "@/components/achievements/stats-summary"
import { DailyWeeklyChallenges } from "@/components/achievements/daily-weekly-challenge"
import { Leaderboard } from "@/components/achievements/leaderboard"

export default function AchievementsPage() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold animate-fadeIn">Your Achievements</h1>
      <p className="text-lg text-muted-foreground animate-fadeIn animation-delay-100">
        Celebrate your progress and see how far you've come!
      </p>
      <BadgeDisplay />
      <DailyWeeklyChallenges />
      <StatsSummary />
      <Leaderboard />
    </main>
  )
}
