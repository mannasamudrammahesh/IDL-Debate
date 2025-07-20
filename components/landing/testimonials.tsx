import { Card, CardContent } from "@/components/ui/card"
import { mockTestimonials } from "@/lib/data"

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Students Say</h2>
            <p className="mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Hear from students who have excelled with DebateQuest.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockTestimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col justify-between p-6">
                <CardContent className="text-lg italic text-gray-700 dark:text-gray-300">
                  &quot;{testimonial.quote}&quot;
                </CardContent>
                <div className="mt-4 text-right">
                  <p className="font-semibold text-purple-600">{testimonial.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
