import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-20"
        />
      </div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl animate-fadeIn">
            DebateQuest
          </h1>
          <p className="max-w-[700px] text-lg md:text-xl animate-fadeIn animation-delay-200">
            Learn to Debate. Practice with AI. Win with Confidence.
          </p>
          <Button asChild className="mt-8 px-8 py-3 text-lg animate-slideInFromBottom">
            <Link href="/learn">Start Learning</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
