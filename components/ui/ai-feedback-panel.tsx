import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { AiFeedback } from "@/lib/types"
import { Lightbulb, AlertTriangle, CheckCircle, Volume2 } from "lucide-react"
import { cn } from "@/utils/cn"

interface AiFeedbackPanelProps {
  feedback: AiFeedback
}

export function AiFeedbackPanel({ feedback }: AiFeedbackPanelProps) {
  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-purple-600" /> AI Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {feedback.fallaciesDetected && feedback.fallaciesDetected.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-1 text-red-600">
              <AlertTriangle className="h-5 w-5" /> Detected Fallacies:
            </h3>
            <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-400">
              {feedback.fallaciesDetected.map((fallacy, index) => (
                <li key={index}>{fallacy}</li>
              ))}
            </ul>
          </div>
        )}

        {feedback.suggestions && feedback.suggestions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-1 text-blue-600">
              <CheckCircle className="h-5 w-5" /> Suggestions for Improvement:
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
              {feedback.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}

        {feedback.argumentStrength !== undefined && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Argument Strength:</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{feedback.argumentStrength.toFixed(1)}/10</span>
              <Progress value={feedback.argumentStrength * 10} className="flex-grow h-3" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {feedback.argumentStrength >= 8
                ? "Strong! Your points were well-supported."
                : feedback.argumentStrength >= 5
                  ? "Good. Your argument had some strength, but could be more impactful."
                  : "Needs work. Focus on providing clearer evidence and reasoning."}
            </p>
          </div>
        )}

        {feedback.coherenceScore !== undefined && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Logical Coherence Score:</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{feedback.coherenceScore.toFixed(1)}/10</span>
              <Progress value={feedback.coherenceScore * 10} className="flex-grow h-3" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {feedback.coherenceScore >= 8
                ? "Excellent! Your argument flowed logically."
                : feedback.coherenceScore >= 5
                  ? "Good. Your argument was mostly clear, but could be more focused."
                  : "Needs work. Consider structuring your points more logically."}
            </p>
          </div>
        )}

        {feedback.rhetoricalTone && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Rhetorical Tone:</h3>
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-gray-500" />
              <span
                className={cn("capitalize font-medium", {
                  "text-green-600": feedback.rhetoricalTone === "persuasive",
                  "text-blue-600": feedback.rhetoricalTone === "formal",
                  "text-yellow-600": feedback.rhetoricalTone === "neutral",
                  "text-red-600": feedback.rhetoricalTone === "aggressive",
                })}
              >
                {feedback.rhetoricalTone}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {feedback.rhetoricalTone === "persuasive" && "Your tone was effective in convincing the audience."}
              {feedback.rhetoricalTone === "formal" && "Your tone was appropriate and professional."}
              {feedback.rhetoricalTone === "neutral" && "Your tone was balanced, but could be more impactful."}
              {feedback.rhetoricalTone === "aggressive" && "Consider a more constructive and less aggressive tone."}
            </p>
          </div>
        )}

        {feedback.fallaciesDetected.length === 0 &&
          feedback.suggestions.length === 0 &&
          feedback.coherenceScore === undefined &&
          feedback.argumentStrength === undefined && (
            <p className="text-muted-foreground">No specific feedback for this round. Keep up the good work!</p>
          )}
      </CardContent>
    </Card>
  )
}
