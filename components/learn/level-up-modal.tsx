"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { PartyPopper, Award, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/utils/cn"

interface LevelUpModalProps {
  isOpen: boolean
  onClose: () => void
  newLevel?: number
  xpEarned?: number
  badgesEarned?: string[]
}

export function LevelUpModal({ isOpen, onClose, newLevel, xpEarned, badgesEarned }: LevelUpModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="animate-popIn">
        <AlertDialogHeader className="text-center">
          {newLevel && (
            <div className="flex flex-col items-center justify-center mb-4">
              <PartyPopper className="h-16 w-16 text-yellow-500 animate-bounce" />
              <AlertDialogTitle className="text-3xl font-bold mt-2">Level Up!</AlertDialogTitle>
              <AlertDialogDescription className="text-xl text-muted-foreground">
                You reached Level {newLevel}!
              </AlertDialogDescription>
            </div>
          )}
          {xpEarned && (
            <div className={cn("flex flex-col items-center justify-center", { "mt-4": !newLevel })}>
              <Sparkles className="h-10 w-10 text-purple-500 animate-pulse" />
              <AlertDialogTitle className="text-2xl font-semibold mt-2">XP Gained!</AlertDialogTitle>
              <AlertDialogDescription className="text-lg text-muted-foreground">
                You earned {xpEarned} XP!
              </AlertDialogDescription>
            </div>
          )}
          {badgesEarned && badgesEarned.length > 0 && (
            <div className={cn("flex flex-col items-center justify-center", { "mt-4": !newLevel && !xpEarned })}>
              <Award className="h-12 w-12 text-green-500 animate-popIn" />
              <AlertDialogTitle className="text-2xl font-semibold mt-2">New Badge Unlocked!</AlertDialogTitle>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {badgesEarned.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 text-base animate-fadeIn"
                    style={{ animationDelay: `${index * 100 + 200}ms` }}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <AlertDialogAction onClick={onClose}>Awesome!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
