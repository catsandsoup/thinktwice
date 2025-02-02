import { Challenge } from "../challengeTypes";

export const wordSelectionChallenges: Challenge[] = [
  {
    id: "word1",
    title: "Constructing Counter-Arguments",
    description: "Complete this framework for addressing a weak argument by selecting the correct phrases.",
    type: "word-selection",
    difficulty: "advanced",
    xpReward: 20,
    passage: "When someone says their opinion is the only logical conclusion, but only considers evidence that supports their view, you can strengthen the discussion by acknowledging their points while introducing overlooked factors.",
    keyWords: [
      {
        word: "their opinion is the only logical conclusion",
        explanation: "This represents a common starting point in weak arguments - claiming absolute certainty"
      },
      {
        word: "evidence that supports their view",
        explanation: "Identifies selective evidence use, a common issue in weak arguments"
      },
      {
        word: "acknowledging their points while introducing overlooked factors",
        explanation: "Emphasizes constructive dialogue over confrontation"
      }
    ]
  }
];