import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Gamepad2, MessageSquareText } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How DebateQuest Works</h2>
            <p className="mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform combines cutting-edge AI with engaging gamification to provide an unparalleled learning
              experience.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="flex flex-col items-center p-6 text-center">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>AI-Powered Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  Get instant, intelligent feedback on your arguments and identify logical fallacies with our advanced
                  AI.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center">
              <CardHeader>
                <Gamepad2 className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Gamified Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  Progress through engaging lessons, earn XP, level up, and unlock badges as you master debate skills.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center">
              <CardHeader>
                <MessageSquareText className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Personalized Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive tailored suggestions to strengthen your arguments and improve your debate performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
