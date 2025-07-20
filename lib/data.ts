import type { UserProgress, Lesson, Testimonial, AiFeedback, DebateMessage } from "./types"

export const mockUserProgress: UserProgress = {
  avatar: "/placeholder.svg?height=100&width=100",
  nickname: "DebateMaster",
  xp: 1250,
  level: 7,
  badges: ["Fallacy Finder", "Argument Architect"],
  modulesCompleted: 5,
  debatesSimulated: 12,
  fallaciesDetected: 3,
  gradeLevel: "high-school",
  experienceLevel: "intermediate",
  accuracy: 85,
  responseTime: 1200, // ms
  debateScore: 7.8,
}

export const mockLessons: Lesson[] = [
  {
    id: "1",
    title: "Debate Basics",
    description: "Understand the fundamental concepts of debate.",
    level: 1,
    progress: 100,
    completed: true,
    content: `
## Introduction to Debate

Debate is a structured discussion where two opposing sides present arguments for and against a specific proposition or motion. The goal is to persuade an audience or a judge that your side's arguments are more valid and well-supported.

### Key Elements of Debate:

1.  **Motion**: The topic or statement being debated. It's usually phrased as a resolution, e.g., "This House believes that social media is harmful."
2.  **Affirmative (Proposition) Side**: Argues in favor of the motion.
3.  **Negative (Opposition) Side**: Argues against the motion.
4.  **Arguments**: Reasons or points presented to support a side's position. Arguments should be logical, evidence-based, and clearly articulated.
5.  **Rebuttal**: The act of refuting or counter-arguing the points made by the opposing side. This is crucial for demonstrating the weaknesses in their case.
6.  **Structure**: Debates typically follow a specific structure with opening statements, rebuttals, and closing summaries.

### Why Debate?

Debate helps develop critical thinking, public speaking, research, and analytical skills. It teaches you to construct logical arguments, listen actively, and respond persuasively under pressure.
`,
    diagramUrl: "/placeholder.svg?height=300&width=500",
    quiz: {
      id: "quiz-1",
      questions: [
        {
          id: "q1",
          type: "mcq",
          question: "What is the primary goal of a debate?",
          options: ["To win an argument", "To persuade an audience", "To share information", "To entertain"],
          correctAnswer: "To persuade an audience",
          feedback: "Correct! The core of debate is persuasion.",
        },
        {
          id: "q2",
          type: "true-false",
          question: "The Affirmative side argues against the motion.",
          correctAnswer: "False",
          feedback: "Incorrect. The Affirmative side argues *for* the motion.",
        },
      ],
    },
  },
  {
    id: "2",
    title: "Roles in Debate",
    description: "Learn the responsibilities of each speaker.",
    level: 2,
    progress: 50,
    completed: false,
    content: `
## Understanding Debate Roles

In most debate formats, each speaker has a specific role and set of responsibilities. Understanding these roles is crucial for a successful debate.

### Common Roles:

1.  **Prime Minister (PM) / First Affirmative**:
    *   Defines the motion.
    *   Presents the affirmative team's case and main arguments.
    *   Sets the framework for the debate.

2.  **Leader of Opposition (LO) / First Negative**:
    *   Challenges the PM's definition (if necessary).
    *   Rebuts the PM's arguments.
    *   Presents the opposition team's case and main arguments.

3.  **Deputy Prime Minister (DPM) / Second Affirmative**:
    *   Rebuts the LO's arguments.
    *   Rebuilds the affirmative case.
    *   Introduces new arguments (if allowed by format).

4.  **Deputy Leader of Opposition (DLO) / Second Negative**:
    *   Rebuts the DPM's arguments.
    *   Rebuilds the opposition case.
    *   Introduces new arguments (if allowed by format).

5.  **Government Whip / Third Affirmative**:
    *   Summarizes the affirmative case.
    *   Rebuts key opposition arguments.
    *   No new arguments.

6.  **Opposition Whip / Third Negative**:
    *   Summarizes the opposition case.
    *   Rebuts key affirmative arguments.
    *   No new arguments.

7.  **Reply Speaker (often PM or LO)**:
    *   Provides a biased summary of the entire debate.
    *   Highlights key clashes and why their side won.
    *   No new arguments.
`,
    quiz: {
      id: "quiz-2",
      questions: [
        {
          id: "q1",
          type: "mcq",
          question: "Which role is responsible for defining the motion?",
          options: ["Leader of Opposition", "Deputy Prime Minister", "Prime Minister", "Reply Speaker"],
          correctAnswer: "Prime Minister",
          feedback: "Correct! The Prime Minister sets the stage.",
        },
        {
          id: "q2",
          type: "true-false",
          question: "The Reply Speaker can introduce new arguments.",
          correctAnswer: "False",
          feedback: "Incorrect. Reply Speakers summarize, they do not introduce new arguments.",
        },
      ],
    },
  },
  {
    id: "3",
    title: "Logical Fallacies",
    description: "Identify and avoid common errors in reasoning.",
    level: 3,
    progress: 0,
    completed: false,
    content: `
## Logical Fallacies: Errors in Reasoning

A logical fallacy is an error in reasoning that makes an argument invalid or weak. Identifying and avoiding fallacies is crucial for constructing strong, persuasive arguments and for effectively rebutting your opponents.

### Common Logical Fallacies:

1.  **Ad Hominem**: Attacking the person making the argument instead of the argument itself.
    *   *Example*: "You can't trust anything she says about climate change; she's just a teenager."

2.  **Straw Man**: Misrepresenting an opponent's argument to make it easier to attack.
    *   *Example*: "My opponent wants to ban all cars, which would destroy the economy. That's ridiculous!" (Opponent actually proposed promoting public transport).

3.  **Slippery Slope**: Asserting that a relatively small first step will inevitably lead to a chain of related, increasingly negative events.
    *   *Example*: "If we allow students to use phones in class, soon they'll be watching movies, then skipping class, and eventually dropping out of school."

4.  **False Dilemma (Black or White)**: Presenting only two options or sides when there are actually more.
    *   *Example*: "Either you support the new policy, or you support chaos."

5.  **Appeal to Authority**: Claiming something is true because an authority figure said it, without sufficient evidence or when the authority is not an expert in that specific field.
    *   *Example*: "My doctor said this diet is the best, so it must be true." (Doctor is not a nutritionist).

6.  **Bandwagon (Ad Populum)**: Claiming something is true because many people believe it.
    *   *Example*: "Everyone is buying this new smartphone, so it must be the best."

### Why Learn Fallacies?

Understanding fallacies helps you:
*   Strengthen your own arguments by ensuring they are logically sound.
*   Critically evaluate the arguments of others.
*   Effectively rebut opponents by pointing out flaws in their reasoning.
`,
    quiz: {
      id: "quiz-3",
      questions: [
        {
          id: "q1",
          type: "mcq",
          question: "Which fallacy involves attacking the person instead of the argument?",
          options: ["Straw Man", "Slippery Slope", "Ad Hominem", "False Dilemma"],
          correctAnswer: "Ad Hominem",
          feedback: "Correct! Ad Hominem attacks the individual, not the idea.",
        },
        {
          id: "q2",
          type: "true-false",
          question: "A Straw Man fallacy accurately represents an opponent's argument.",
          correctAnswer: "False",
          feedback: "Incorrect. A Straw Man distorts the opponent's argument.",
        },
      ],
    },
  },
]

export const mockTestimonials: Testimonial[] = [
  {
    quote: "DebateQuest transformed my public speaking skills! The AI feedback is incredibly insightful.",
    author: "Sarah L.",
    role: "High School Student",
  },
  {
    quote: "The gamified modules made learning debate fun and engaging. I actually look forward to practicing!",
    author: "David K.",
    role: "Middle School Student",
  },
  {
    quote: "As a college student, DebateQuest helped me refine my arguments and detect fallacies like a pro.",
    author: "Emily R.",
    role: "College Student",
  },
]

export const mockAiFeedback: AiFeedback = {
  fallaciesDetected: ["Ad Hominem", "Straw Man"],
  suggestions: [
    "Focus on the policy implications rather than personal attacks.",
    "Ensure your rebuttal directly addresses the opponent's actual argument, not a distorted version.",
    "Provide more specific evidence to support your claims.",
  ],
  coherenceScore: 6.5,
}

export const mockDebateMessages: DebateMessage[] = [
  {
    id: "1",
    role: "ai",
    content:
      'Welcome to the debate! The motion is: "This House believes that social media is harmful." You are the Prime Minister. Please present your opening statement.',
    timestamp: new Date(),
  },
  {
    id: "2",
    role: "user",
    content:
      "Social media leads to increased anxiety and depression among young people, as studies show a correlation between heavy usage and mental health decline.",
    timestamp: new Date(),
  },
  {
    id: "3",
    role: "ai",
    content:
      "While mental health is a concern, social media also provides vital platforms for connection, activism, and education. Many studies also highlight its positive impact on community building and information dissemination. How do you reconcile your claim with these benefits?",
    timestamp: new Date(),
  },
  {
    id: "4",
    role: "user",
    content:
      "The negative impacts outweigh the benefits. The curated, often unrealistic, portrayals of life on social media create immense pressure and foster comparison, leading to feelings of inadequacy.",
    timestamp: new Date(),
  },
]
