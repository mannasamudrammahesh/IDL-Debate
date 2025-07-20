"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useUserProgress } from "@/hooks/use-user-progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"

export function Navbar() {
  const { userProgress, loading } = useUserProgress()

  return (
    <nav className="flex items-center justify-between p-4 border-b bg-background">
      <Link href="/" className="text-2xl font-bold text-primary">
        DebateQuest
      </Link>
      <div className="flex items-center gap-4">
        {loading ? (
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
        ) : userProgress ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium hidden sm:block">Level {userProgress.level}</span>
              <Progress value={(userProgress.xp % 200) / 2} className="w-24 h-2 hidden sm:block" />
              <span className="text-sm font-medium hidden sm:block">{userProgress.xp % 200}/200 XP</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userProgress.avatar || "/placeholder.svg"} alt={userProgress.nickname} />
                    <AvatarFallback>{userProgress.nickname.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProgress.nickname}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userProgress.gradeLevel} - {userProgress.experienceLevel}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button asChild variant="outline">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}
