import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { AiFeedback } from "@/lib/types"
import { Lightbulb, AlertTriangle, CheckCircle } from "lucide-react"

interface AiFeedbackPanelProps {
  feedback: AiFeedback
}

export function AiFeedbackPanel({ feedback }: AiFeedbackPanelProps) {
  return (
    <Card className="w-full">
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

        {feedback.coherenceScore !== undefined && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Argument Coherence Score:</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{feedback.coherenceScore.toFixed(1)}/10</span>
              <Progress value={feedback.coherenceScore * 10} className="flex-grow h-3" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {feedback.coherenceScore >= 8
                ? "Excellent! Your argument is very clear and well-structured."
                : feedback.coherenceScore >= 5
                  ? "Good. Your argument is mostly clear, but could be more focused."
                  : "Needs work. Consider structuring your points more logically."}
            </p>
          </div>
        )}

        {feedback.fallaciesDetected.length === 0 &&
          feedback.suggestions.length === 0 &&
          feedback.coherenceScore === undefined && (
            <p className="text-muted-foreground">No specific feedback for this round. Keep up the good work!</p>
          )}
      </CardContent>
    </Card>
  )
}
