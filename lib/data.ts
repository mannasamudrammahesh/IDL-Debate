import type { Lesson, UserProgress, DebateMessage, AiFeedback, Testimonial, DebateSession, Challenge } from "./types"

export const mockUserProgress: UserProgress = {
  id: "user-123",
  nickname: "DebateMaster",
  avatar: "/placeholder-user.jpg",
  gradeLevel: "high-school",
  experienceLevel: "intermediate",
  xp: 150,
  level: 1,
  badges: ["Argument Architect"],
  modulesCompleted: 2,
  debatesSimulated: 5,
  fallaciesDetected: 10,
  lastLessonId: "lesson-2",
  lastLessonProgress: 75,
  weeklyStreak: 3,
  lastLoginDate: "2025-07-19",
}

export const mockLessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Debate Basics: Structure & Flow",
    description: "Understand the fundamental structure of a debate round.",
    level: 1,
    xpReward: 100,
    completed: true,
    progress: 100,
    content: `
## Introduction to Debate Structure

Debate is a structured argument, and understanding its framework is crucial. Most debates follow a clear sequence of speeches, ensuring fairness and logical progression.

### The Core Components

1.  **Motion**: The topic being debated, usually phrased as a statement (e.g., "This House would ban single-use plastics").
2.  **Teams**: Typically two teams, one affirming (supporting) the motion and one negating (opposing) it.
3.  **Speakers**: Each team has a set number of speakers, each with specific roles.

### Standard Debate Flow (Simplified)

A common format, like British Parliamentary or Public Forum, involves several rounds:

*   **Opening Statements**: Each side presents their initial case and arguments. This is where you lay out your main points.
*   **Rebuttals**: Speakers respond to the arguments made by the opposing team, refuting their points and defending their own. This is the heart of the debate.
*   **Summaries/Closings**: Final speeches where teams summarize their key arguments and explain why they should win the debate. No new arguments are allowed here.

### Points of Information (POIs)

During an opponent's speech, you might be able to offer a "Point of Information." This is a brief question or statement to challenge their argument. The speaker can choose to accept or reject the POI.

Understanding these phases helps you know when to present your case, when to attack, and when to summarize.
    `,
    diagramUrl: "/placeholder.svg?height=300&width=500",
    quiz: {
      id: "quiz-1",
      questions: [
        {
          id: "q1-1",
          question: "What is the purpose of an opening statement in a debate?",
          type: "mcq",
          options: [
            "To summarize the entire debate",
            "To present initial arguments and case",
            "To refute opponent's points",
            "To ask a Point of Information",
          ],
          correctAnswer: "To present initial arguments and case",
          feedback: "Correct! Opening statements are for laying out your initial case.",
        },
        {
          id: "q1-2",
          question: "True or False: New arguments are typically allowed during the summary phase.",
          type: "true-false",
          correctAnswer: "False",
          feedback: "False. The summary phase is for concluding, not introducing new points.",
        },
      ],
    },
  },
  {
    id: "lesson-2",
    title: "Roles in Debate: Speaker Responsibilities",
    description: "Learn the specific duties of each speaker in a debate.",
    level: 1,
    xpReward: 100,
    completed: false,
    progress: 75,
    content: `
## Understanding Speaker Roles

In a structured debate, each speaker has a defined role and set of responsibilities. Knowing your role, and your opponent's, is key to success.

### Common Roles (Example: British Parliamentary Style)

*   **Prime Minister (PM)**: Opens the debate for the Affirmative team. Defines the motion, presents the team's case, and introduces initial arguments.
*   **Leader of Opposition (LO)**: Opens for the Negative team. Responds to the PM's case, presents the opposition's counter-arguments, and outlines their team's stance.
*   **Deputy Prime Minister (DPM)**: Second speaker for the Affirmative. Rebuts the LO's arguments, reinforces the Affirmative's case, and introduces new arguments (if allowed by format).
*   **Deputy Leader of Opposition (DLO)**: Second speaker for the Negative. Rebuts the DPM's arguments, reinforces the Negative's case, and introduces new arguments (if allowed).
*   **Government Whip / Opposition Whip**: Later speakers who summarize their team's case, highlight key clashes, and often provide a final rebuttal.
*   **Leader of Opposition Reply / Prime Minister Reply**: Final speakers who give a concise summary of the entire debate from their side's perspective, emphasizing why their team won.

### Key Responsibilities Across Roles

*   **Construction**: Building and presenting your team's arguments.
*   **Rebuttal**: Directly addressing and dismantling opponent's arguments.
*   **Extension**: Introducing new arguments or deepening existing ones (depending on the role and format).
*   **Summarization**: Concluding your team's case and highlighting key victories.

Mastering your role ensures your team's arguments are presented effectively and strategically.
    `,
    diagramUrl: "/placeholder.svg?height=300&width=500",
    quiz: {
      id: "quiz-2",
      questions: [
        {
          id: "q2-1",
          question:
            "Which speaker typically defines the motion and presents the initial arguments for the Affirmative team?",
          type: "mcq",
          options: ["Leader of Opposition", "Deputy Prime Minister", "Prime Minister", "Government Whip"],
          correctAnswer: "Prime Minister",
          feedback: "Correct! The Prime Minister sets the stage for the Affirmative.",
        },
        {
          id: "q2-2",
          question: "True or False: Rebuttal is the act of summarizing your own arguments.",
          type: "true-false",
          correctAnswer: "False",
          feedback: "False. Rebuttal is about refuting your opponent's arguments.",
        },
      ],
    },
  },
  {
    id: "lesson-3",
    title: "Logical Fallacies: Spotting Weak Arguments",
    description: "Identify common errors in reasoning to strengthen your arguments and weaken opponents'.",
    level: 2,
    xpReward: 150,
    completed: false,
    progress: 0,
    content: `
## Introduction to Logical Fallacies

A logical fallacy is an error in reasoning that makes an argument invalid or weak. Learning to identify them is crucial for both constructing strong arguments and deconstructing weak ones.

### Common Logical Fallacies

1.  **Ad Hominem**: Attacking the person making the argument, rather than the argument itself.
    *   *Example*: "You can't trust anything she says about climate change; she failed her science class!"
2.  **Straw Man**: Misrepresenting an opponent's argument to make it easier to attack.
    *   *Example*: "My opponent wants to cut military spending, which means he wants to leave our country defenseless." (Opponent might want to reallocate funds, not eliminate defense).
3.  **Bandwagon Fallacy (Ad Populum)**: Assuming something is true or good because many people believe it or do it.
    *   *Example*: "Everyone is buying this new smartphone, so it must be the best one on the market."
4.  **Slippery Slope**: Asserting that a relatively small first step will inevitably lead to a chain of related, increasingly negative events.
    *   *Example*: "If we allow students to use phones in class, soon they'll be watching movies, then skipping class, and eventually dropping out of school!"
5.  **False Dilemma (Black or White)**: Presenting only two options or sides when there are actually more.
    *   *Example*: "Either you support the new policy, or you're against progress."

### Why They Matter in Debate

*   **For Your Own Arguments**: Avoiding fallacies makes your arguments more robust and persuasive.
*   **For Opponent's Arguments**: Identifying fallacies in your opponent's speech allows you to expose weaknesses and undermine their case.

Practice spotting these in everyday conversations and media to hone your critical thinking skills!
    `,
    diagramUrl: "/placeholder.svg?height=300&width=500",
    quiz: {
      id: "quiz-3",
      questions: [
        {
          id: "q3-1",
          question: "Which fallacy involves attacking the person rather than their argument?",
          type: "mcq",
          options: ["Straw Man", "Slippery Slope", "Ad Hominem", "Bandwagon"],
          correctAnswer: "Ad Hominem",
          feedback: "Correct! Ad Hominem attacks the individual, not the logic.",
        },
        {
          id: "q3-2",
          question: "True or False: The Straw Man fallacy misrepresents an opponent's argument.",
          type: "true-false",
          correctAnswer: "True",
          feedback: "True. It's about creating a 'straw man' version of their argument to easily knock down.",
        },
      ],
    },
  },
]

export const mockTestimonials: Testimonial[] = [
  {
    quote:
      "DebateQuest made learning debate so much fun! The gamified modules kept me engaged, and the AI feedback was incredibly helpful for improving my arguments.",
    author: "Sarah L.",
    role: "High School Student",
  },
  {
    quote:
      "As a beginner, I was intimidated by debate. DebateQuest broke it down into easy steps, and the practice arena felt just like a real debate, but with instant coaching!",
    author: "David C.",
    role: "Middle School Student",
  },
  {
    quote:
      "The logical fallacies module was a game-changer. I can now spot weak arguments instantly, which has boosted my confidence in every debate.",
    author: "Emily R.",
    role: "College Debate Club Member",
  },
]

export const mockDebateMessages: DebateMessage[] = [
  {
    id: "msg-1",
    role: "ai",
    content:
      "Welcome to the debate! The motion is: 'Should school uniforms be mandatory?'. You are the Prime Minister. Please present your opening statement.",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "msg-2",
    role: "user",
    content:
      "I believe school uniforms should be mandatory because they reduce distractions and promote a more focused learning environment. When students don't have to worry about fashion, they can concentrate on academics.",
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: "msg-3",
    role: "ai",
    content:
      "Thank you for your opening statement. While reducing distractions is a valid point, mandatory uniforms can stifle student individuality and self-expression, which are crucial for personal development. Furthermore, the financial burden on low-income families can be significant.",
    timestamp: new Date(),
  },
]

export const mockAiFeedback: AiFeedback = {
  argumentStrength: 7.5,
  coherenceScore: 8.2,
  fallaciesDetected: ["No Fallacies Detected"],
  suggestions: [
    "Provide specific examples of how fashion choices distract students.",
    "Quantify the impact of uniforms on academic focus.",
    "Consider addressing potential counter-arguments proactively.",
  ],
  rhetoricalTone: "persuasive",
}

export const mockDebateSessions: DebateSession[] = [
  {
    id: "session-1",
    motion: "Should school uniforms be mandatory?",
    userRole: "Prime Minister",
    date: "2025-07-18",
    duration: 300,
    messages: mockDebateMessages,
    finalFeedback: {
      argumentStrength: 7.5,
      coherenceScore: 8.2,
      fallaciesDetected: ["No Fallacies Detected"],
      suggestions: [
        "Provide specific examples of how fashion choices distract students.",
        "Quantify the impact of uniforms on academic focus.",
        "Consider addressing potential counter-arguments proactively.",
      ],
      rhetoricalTone: "persuasive",
    },
    score: 75,
  },
  {
    id: "session-2",
    motion: "Is artificial intelligence a threat to humanity?",
    userRole: "Opposition Leader",
    date: "2025-07-17",
    duration: 280,
    messages: [], // Simplified for mock
    finalFeedback: {
      argumentStrength: 6.0,
      coherenceScore: 7.0,
      fallaciesDetected: ["Ad Hominem (minor)"],
      suggestions: ["Focus on the argument, not the AI's 'lack of empathy'."],
      retary: "neutral",
    },
    score: 60,
  },
  {
    id: "session-3",
    motion: "Should social media companies be held responsible for misinformation?",
    userRole: "Prime Minister",
    date: "2025-07-16",
    duration: 320,
    messages: [], // Simplified for mock
    finalFeedback: {
      argumentStrength: 8.5,
      coherenceScore: 9.0,
      fallaciesDetected: ["No Fallacies Detected"],
      suggestions: ["Excellent use of evidence and clear structure."],
      rhetoricalTone: "formal",
    },
    score: 90,
  },
]

export const mockChallenges: Challenge[] = [
  {
    id: "daily-1",
    name: "Daily Quiz Master",
    description: "Complete any lesson quiz with 100% accuracy.",
    xpReward: 50,
    badgeReward: "Quiz Whiz",
    completed: false,
    type: "daily",
  },
  {
    id: "daily-2",
    name: "Daily Debate Practice",
    description: "Complete one full debate simulation in the Practice Arena.",
    xpReward: 75,
    completed: true,
    type: "daily",
  },
  {
    id: "weekly-1",
    name: "Weekly Fallacy Finder",
    description: "Identify 5 logical fallacies in AI feedback across multiple debates.",
    xpReward: 200,
    badgeReward: "Fallacy Finder",
    completed: false,
    type: "weekly",
  },
  {
    id: "weekly-2",
    name: "Weekly Argument Architect",
    description: "Achieve an average argument strength of 8.0+ in 3 debate sessions.",
    xpReward: 250,
    badgeReward: "Argument Architect",
    completed: true,
    type: "weekly",
  },
]
