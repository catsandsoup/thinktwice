import { StandardChallenge } from "../challengeTypes";

export const fallacyChallenges: StandardChallenge[] = [
  {
    id: "fallacy-1",
    title: "Logical Fallacy Detection",
    description: "Which of these responses contains a straw man fallacy?",
    type: "fallacy",
    options: [
      {
        id: "1",
        text: "We should invest more in public transportation to reduce traffic.",
        isCorrect: false,
        explanation: "This is the original argument, stated clearly without distortion."
      },
      {
        id: "2",
        text: "So you want to force everyone to give up their cars completely?",
        isCorrect: true,
        explanation: "This is a straw man fallacy - it misrepresents the original position by exaggerating it to an extreme."
      }
    ],
    difficulty: "beginner",
    xpReward: 10
  },
  {
    id: "fallacy-2",
    title: "Identifying Ad Hominem Fallacies",
    description: "Which response demonstrates an ad hominem fallacy?",
    type: "fallacy",
    options: [
      {
        id: "1",
        text: "Your economic proposal won't work because you've never run a business.",
        isCorrect: true,
        explanation: "This is an ad hominem fallacy because it attacks the person's characteristics rather than addressing their argument."
      },
      {
        id: "2",
        text: "Your economic proposal won't work because it doesn't account for inflation.",
        isCorrect: false,
        explanation: "This is a valid criticism that addresses the substance of the argument rather than attacking the person."
      }
    ],
    difficulty: "beginner",
    xpReward: 10
  },
  {
    id: "fallacy-3",
    title: "Correlation vs. Causation",
    description: "Which statement incorrectly implies causation?",
    type: "fallacy",
    options: [
      {
        id: "1",
        text: "Ice cream sales and drowning incidents both increase in summer months.",
        isCorrect: false,
        explanation: "This statement only notes a correlation without implying that one causes the other."
      },
      {
        id: "2",
        text: "Ice cream sales are causing more drowning incidents this summer.",
        isCorrect: true,
        explanation: "This incorrectly assumes causation from correlation. Both increases are likely due to warmer weather, not a causal relationship."
      }
    ],
    difficulty: "beginner",
    xpReward: 10
  }
];