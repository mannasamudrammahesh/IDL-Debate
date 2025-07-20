"use client"

import { useState } from "react"
import type { Quiz } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"

interface QuizChallengeProps {
  quiz: Quiz
  onQuizComplete: (xpEarned: number, badgesEarned: string[]) => void
}

export function QuizChallenge({ quiz, onQuizComplete }: QuizChallengeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = quiz.questions[currentQuestionIndex]

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      setFeedback("Please select an answer.")
      setIsCorrect(null)
      return
    }

    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setFeedback(currentQuestion.feedback)

    if (correct) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setFeedback(null)
      setIsCorrect(null)
    } else {
      setQuizCompleted(true)
      const xpEarned = score * 50 // Example: 50 XP per correct answer
      const badgesEarned: string[] = []
      if (score === quiz.questions.length) {
        badgesEarned.push("Quiz Master") // Example badge
      }
      onQuizComplete(xpEarned, badgesEarned)
    }
  }

  if (quizCompleted) {
    return (
      <Card className="h-full flex flex-col justify-center items-center text-center p-6">
        <CardTitle className="text-3xl font-bold text-green-600 mb-4">Quiz Completed!</CardTitle>
        <p className="text-xl mb-4">
          You scored {score} out of {quiz.questions.length}!
        </p>
        <Button onClick={() => window.location.reload()}>Go back to Modules</Button> {/* Simple reload for demo */}
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Quiz Challenge</CardTitle>
        <p className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </p>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <p className="text-lg font-semibold">{currentQuestion.question}</p>
          {currentQuestion.type === "mcq" && currentQuestion.options && (
            <RadioGroup
              value={selectedAnswer || ""}
              onValueChange={setSelectedAnswer}
              className="space-y-2"
              disabled={feedback !== null}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {currentQuestion.type === "true-false" && (
            <RadioGroup
              value={selectedAnswer || ""}
              onValueChange={setSelectedAnswer}
              className="space-y-2"
              disabled={feedback !== null}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="True" id="option-true" />
                <Label htmlFor="option-true">True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="False" id="option-false" />
                <Label htmlFor="option-false">False</Label>
              </div>
            </RadioGroup>
          )}
        </div>
        {feedback && (
          <div
            className={`mt-4 p-3 rounded-md flex items-center gap-2 ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            <p className="text-sm">{feedback}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {feedback === null ? (
          <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
