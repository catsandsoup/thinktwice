import { HighlightChallenge } from "./challengeTypes";

export const highlightChallenges: HighlightChallenge[] = [
  {
    id: "highlight-1",
    title: "Identifying Assumption Chains",
    description: "Highlight three assumptions in this logical chain that need verification.",
    type: "highlight",
    statement: "Since more people are working from home, downtown office buildings are emptying out. This means city centers will become crime-ridden ghost towns, leading to an inevitable collapse of urban property values.",
    highlights: [
      {
        text: "office buildings are emptying out",
        explanation: "Is this temporary or permanent?"
      },
      {
        text: "will become crime-ridden ghost towns",
        explanation: "Assumes no alternative uses for spaces"
      },
      {
        text: "inevitable collapse of urban property values",
        explanation: "Ignores potential adaptations and other factors affecting property values"
      }
    ],
    difficulty: "intermediate",
    xpReward: 15
  }
];