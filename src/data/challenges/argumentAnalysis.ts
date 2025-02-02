import { Challenge } from "../challengeTypes";

export const argumentAnalysisChallenges: Challenge[] = [
  {
    id: "arg1",
    title: "Social Media Debate Analysis",
    description: "You're scrolling through comments on a post about whether college is worth the cost. Identify the logical fallacy in this comment:\n\n\"My friend dropped out of college and now makes six figures as a programmer. Anyone who says you need college to succeed is just brainwashed by the education system.\"",
    type: "fallacy",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "arg1a",
        text: "Hasty Generalization (using one example to make a broad conclusion)",
        isCorrect: true,
        explanation: "The commenter uses a single success story (their friend) to conclude that college is unnecessary for everyone."
      },
      {
        id: "arg1b",
        text: "Ad Hominem (attacking the person instead of the argument)",
        isCorrect: false,
        explanation: "While dismissive, the comment doesn't primarily attack individuals."
      },
      {
        id: "arg1c",
        text: "False Dilemma (presenting only two options)",
        isCorrect: false,
        explanation: "The comment doesn't present only two options explicitly."
      },
      {
        id: "arg1d",
        text: "Appeal to Authority (citing an expert opinion)",
        isCorrect: false,
        explanation: "No authority figures are cited in this argument."
      }
    ]
  },
  {
    id: "arg2",
    title: "Product Marketing Analysis",
    description: "You see this advertisement: \"Scientists agree that antioxidants are good for health. Therefore, our $50 SuperBerry juice, packed with antioxidants, is essential for your wellness routine.\"\n\nWhich TWO logical flaws appear in this argument?",
    type: "fallacy",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "arg2a",
        text: "Appeal to Authority",
        isCorrect: false,
        explanation: "Scientists' agreement about antioxidants is actually valid evidence."
      },
      {
        id: "arg2b",
        text: "False Causation",
        isCorrect: false,
        explanation: "The ad doesn't claim direct causation."
      },
      {
        id: "arg2c",
        text: "Non Sequitur (conclusion doesn't follow from premises)",
        isCorrect: true,
        explanation: "The jump from \"antioxidants are good\" to \"our expensive juice is essential\" doesn't logically follow."
      },
      {
        id: "arg2d",
        text: "Bandwagon Appeal",
        isCorrect: false,
        explanation: "The ad doesn't rely on popularity."
      },
      {
        id: "arg2e",
        text: "False Equivalence (treating different things as the same)",
        isCorrect: true,
        explanation: "The ad falsely equates general antioxidant benefits with their specific product's necessity."
      }
    ]
  }
];