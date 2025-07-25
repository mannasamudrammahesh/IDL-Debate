import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Gamepad, MessageCircle } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How DebateQuest Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines cutting-edge AI with engaging learning methods to make you a debate champion.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="flex flex-col items-center p-6 text-center animate-slideInFromBottom">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI-Powered Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                Get instant, structured feedback on your arguments, logical fallacies, and rhetorical tone from our
                advanced AI.
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center animate-slideInFromBottom animation-delay-200">
              <CardHeader>
                <Gamepad className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Gamified Learning</CardTitle>
              </CardHeader>
              <CardContent>
                Progress through levels, earn XP, unlock badges, and tackle daily challenges to master debate skills.
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center animate-slideInFromBottom animation-delay-400">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Debate Simulation Arena</CardTitle>
              </CardHeader>
              <CardContent>
                Practice real-time debates against AI opponents on various topics, honing your impromptu speaking and
                rebuttal skills.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
