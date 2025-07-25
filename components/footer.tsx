import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6 border-t">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} DebateQuest. All rights reserved.</p>
        <nav className="flex gap-4 mt-4 md:mt-0">
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
