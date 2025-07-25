import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockTestimonials } from "@/lib/data"

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Students Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our community of aspiring debaters.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {mockTestimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="flex flex-col p-6 text-left animate-slideInFromBottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="flex-grow">
                  <p className="text-lg italic leading-relaxed">"{testimonial.quote}"</p>
                </CardContent>
                <div className="flex items-center mt-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40&query=user+avatar+${index}`}
                      alt={testimonial.author}
                    />
                    <AvatarFallback>
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
