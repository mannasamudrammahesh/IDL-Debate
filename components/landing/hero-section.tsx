import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">DebateQuest</h1>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl">Learn to Debate. The Smart Way.</p>
          <div className="space-x-4">
            <Button
              asChild
              className="bg-white text-purple-700 hover:bg-gray-100 hover:text-purple-800 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300"
            >
              <Link href="/dashboard">Start Learning</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
