import { StandardChallenge } from "../challengeTypes";

export const headlineChallenges: StandardChallenge[] = [
  {
    id: "headline-1",
    title: "Analyzing News Headlines",
    description: "Compare these two headlines about the same climate study. Which one demonstrates more neutral, factual reporting?",
    type: "headline",
    options: [
      {
        id: "1",
        text: "Study Shows 5% Temperature Rise in Arctic Region",
        isCorrect: true,
        explanation: "This headline presents the information neutrally, focusing on the specific data point without emotional language."
      },
      {
        id: "2",
        text: "CLIMATE CATASTROPHE: Earth's Fever Spirals Out of Control!",
        isCorrect: false,
        explanation: "This headline uses sensational language and emotional manipulation rather than presenting the facts objectively."
      }
    ],
    difficulty: "beginner",
    xpReward: 10
  }
];