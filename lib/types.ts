export type UserLevel = "middle-school" | "high-school"
export type DebateExperience = "beginner" | "intermediate"

export interface UserProgress {
  avatar: string
  nickname: string
  xp: number
  level: number
  badges: string[]
  modulesCompleted: number
  debatesSimulated: number
  fallaciesDetected: number
  gradeLevel: UserLevel
  experienceLevel: DebateExperience
  accuracy: number
  responseTime: number
  debateScore: number
}

export interface Lesson {
  id: string
  title: string
  description: string
  level: number
  progress: number // 0-100
  completed: boolean
  quiz: Quiz
  content: string // Markdown or plain text
  diagramUrl?: string
}

export interface Quiz {
  id: string
  questions: Question[]
}

export interface Question {
  id: string
  type: "mcq" | "true-false"
  question: string
  options?: string[]
  correctAnswer: string
  feedback: string
}

export interface DebateMessage {
  id: string
  role: "user" | "ai"
  content: string
  timestamp: Date
}

export interface AiFeedback {
  fallaciesDetected: string[]
  suggestions: string[]
  coherenceScore: number // 0-10
}

export interface Testimonial {
  quote: string
  author: string
  role: string
}
