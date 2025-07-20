import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Swords, Trophy, Settings } from "lucide-react"

export function NavigationCards() {
  const navItems = [
    {
      title: "Learn Modules",
      description: "Explore gamified lessons and quizzes.",
      icon: BookOpen,
      href: "/learn",
    },
    {
      title: "Practice Arena",
      description: "Simulate debates with AI opponents.",
      icon: Swords,
      href: "/practice",
    },
    {
      title: "Achievements",
      description: "Track your badges and debate stats.",
      icon: Trophy,
      href: "/achievements",
    },
    {
      title: "Settings",
      description: "Manage your profile and preferences.",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
              <item.icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
