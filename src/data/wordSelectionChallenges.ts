import { WordSelectionChallenge } from "./challengeTypes";

export const wordSelectionChallenges: WordSelectionChallenge[] = [
  {
    title: "Identifying Loaded Language",
    description: "Click on words that reveal potential bias or manipulation in this medical news excerpt.",
    type: "word-selection",
    passage: "The experimental treatment could be a game-changer in medical science, experts believe. Dr. Smith admitted that while 60% of patients showed improvement, more research is needed.",
    keyWords: [
      {
        word: "game-changer",
        explanation: "Hype/sensationalistic language that overstates impact"
      },
      {
        word: "admitted",
        explanation: "Suggests reluctance or guilt, showing bias"
      },
      {
        word: "experts",
        explanation: "Vague appeal to authority without specifics"
      }
    ],
    difficulty: "intermediate",
    xpReward: 15
  }
];
