import { Challenge } from "../challengeTypes";

export const strengthAnalysisChallenges: Challenge[] = [
  {
    id: "strength1",
    title: "Four-Day Work Week Debate",
    description: "In a debate about implementing a four-day work week, which argument is strongest?",
    type: "fallacy",
    difficulty: "advanced",
    xpReward: 20,
    options: [
      {
        id: "s1a",
        text: "It's obvious that a four-day work week is better because people hate working five days.",
        isCorrect: false,
        explanation: "Relies on emotional appeal and assumption"
      },
      {
        id: "s1b",
        text: "Studies in multiple countries show similar or increased productivity with four-day work weeks, plus reduced burnout and lower operating costs.",
        isCorrect: true,
        explanation: "Uses specific evidence, multiple factors, and real-world data"
      },
      {
        id: "s1c",
        text: "Every progressive company is moving to four-day weeks, so we'll look bad if we don't.",
        isCorrect: false,
        explanation: "Appeals to trends rather than merit"
      },
      {
        id: "s1d",
        text: "Anyone who wants to work five days clearly doesn't value work-life balance.",
        isCorrect: false,
        explanation: "Creates a false character attack"
      }
    ]
  },
  {
    id: "strength2",
    title: "Library Policy Analysis",
    description: "\"Since the library's new late fee policy was implemented, book returns have decreased. The policy must be making people keep books longer.\"\n\nWhat's the key hidden assumption in this argument?",
    type: "fallacy",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "s2a",
        text: "Libraries shouldn't charge late fees",
        isCorrect: false,
        explanation: "This is a separate debate, not an assumption in the argument"
      },
      {
        id: "s2b",
        text: "People don't value library books",
        isCorrect: false,
        explanation: "Not assumed in the original argument"
      },
      {
        id: "s2c",
        text: "The policy change is the only factor affecting return rates",
        isCorrect: true,
        explanation: "The argument assumes no other factors (like seasonal changes, COVID, etc.) could explain the decrease"
      },
      {
        id: "s2d",
        text: "Higher fees lead to better compliance",
        isCorrect: false,
        explanation: "The argument actually suggests the opposite"
      }
    ]
  }
];