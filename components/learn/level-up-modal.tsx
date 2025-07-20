"use client"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Sparkles, Award } from "lucide-react"
import { useState, useEffect } from "react"

interface LevelUpModalProps {
  isOpen: boolean
  onClose: () => void
  newLevel?: number
  xpEarned?: number
  badgesEarned?: string[]
}

export function LevelUpModal({ isOpen, onClose, newLevel, xpEarned, badgesEarned }: LevelUpModalProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [isOpen])

  if (!show) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-sm sm:max-w-md text-center animate-scale-in">
        <AlertDialogHeader>
          {newLevel && (
            <div className="flex flex-col items-center justify-center mb-4">
              <Sparkles className="h-16 w-16 text-yellow-400 animate-bounce-once" />
              <AlertDialogTitle className="text-3xl font-bold mt-2">Level Up!</AlertDialogTitle>
              <AlertDialogDescription className="text-xl text-muted-foreground">
                You reached Level {newLevel}!
              </AlertDialogDescription>
            </div>
          )}
          {badgesEarned && badgesEarned.length > 0 && (
            <div className="flex flex-col items-center justify-center mb-4">
              <Award className="h-16 w-16 text-blue-500 animate-spin-once" />
              <AlertDialogTitle className="text-3xl font-bold mt-2">Badge Earned!</AlertDialogTitle>
              <AlertDialogDescription className="text-xl text-muted-foreground">
                You earned: {badgesEarned.join(", ")}
              </AlertDialogDescription>
            </div>
          )}
          {xpEarned && (
            <AlertDialogDescription className="text-lg text-green-600 font-semibold">
              +{xpEarned} XP!
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <Button onClick={onClose}>Awesome!</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
