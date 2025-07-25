export type UserLevel = "middle-school" | "high-school"
export type DebateExperience = "beginner" | "intermediate" | "advanced"

export interface UserProgress {
  id: string
  nickname: string
  avatar: string
  gradeLevel: UserLevel | ""
  experienceLevel: DebateExperience | ""
  xp: number
  level: number
  badges: string[]
  modulesCompleted: number
  debatesSimulated: number
  fallaciesDetected: number
  lastLessonId?: string
  lastLessonProgress?: number
  weeklyStreak: number
  lastLoginDate: string // YYYY-MM-DD
}

export interface Lesson {
  id: string
  title: string
  description: string
  level: number
  xpReward: number
  completed: boolean
  progress: number // 0-100
  content: string
  diagramUrl?: string
  quiz: Quiz
}

export interface Quiz {
  id: string
  questions: QuizQuestion[]
}

export type QuizQuestionType = "mcq" | "true-false"

export interface QuizQuestion {
  id: string
  question: string
  type: QuizQuestionType
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
  argumentStrength: number // 0-10
  coherenceScore: number // 0-10
  fallaciesDetected: string[]
  suggestions: string[]
  rhetoricalTone: "formal" | "neutral" | "persuasive" | "aggressive"
}

export interface DebateSession {
  id: string
  motion: string
  userRole: string
  date: string // YYYY-MM-DD
  duration: number // seconds
  messages: DebateMessage[]
  finalFeedback: AiFeedback
  score: number // overall debate score
}

export interface Testimonial {
  quote: string
  author: string
  role: string
}

export interface Challenge {
  id: string
  name: string
  description: string
  xpReward: number
  badgeReward?: string
  completed: boolean
  type: "daily" | "weekly"
}
