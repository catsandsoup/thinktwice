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
  },
  {
    id: "arg3",
    title: "News Article Analysis",
    description: "Read this news article excerpt about a local policy change and identify the sentences that contain unsupported claims or logical flaws:",
    type: "word-selection",
    difficulty: "advanced",
    xpReward: 20,
    passage: "The city council's decision to increase parking fees has been met with widespread criticism. Every business owner in the downtown area agrees that this will destroy local commerce. Studies show that higher parking fees always lead to decreased foot traffic. The mayor, who previously worked for a parking management company, clearly has ulterior motives. Similar policies in other cities have had mixed results, with some reporting increased use of public transport while others saw declining retail sales. The additional revenue will be used to improve public transportation, though no specific plans have been announced yet.",
    keyWords: [
      {
        word: "Every business owner in the downtown area agrees that this will destroy local commerce",
        explanation: "Hasty generalization and hyperbole - unlikely that literally every business owner agrees, and 'destroy' is an extreme claim without evidence"
      },
      {
        word: "Studies show that higher parking fees always lead to decreased foot traffic",
        explanation: "Absolute claim ('always') without specific evidence or acknowledgment of varying circumstances"
      },
      {
        word: "The mayor, who previously worked for a parking management company, clearly has ulterior motives",
        explanation: "Ad hominem attack - dismissing the policy based on personal history rather than its merits"
      }
    ]
  },
  {
    id: "arg4",
    title: "Real-World Fallacy Recognition",
    description: "Match these common social situations with the logical fallacies they demonstrate.",
    type: "matching",
    difficulty: "intermediate",
    xpReward: 15,
    pairs: [
      {
        id: "pair1",
        claim: "If you really cared about the environment, you'd never use a car.",
        evidence: "No True Scotsman: The 'true environmentalist' argument creates an unrealistic purity test"
      },
      {
        id: "pair2",
        claim: "Everyone's investing in crypto now, so it must be a good idea.",
        evidence: "Bandwagon Appeal: Relies on popularity rather than merit"
      },
      {
        id: "pair3",
        claim: "That research can't be trusted because the scientist once worked for a corporation.",
        evidence: "Ad Hominem: Attacks the researcher's background instead of the research"
      },
      {
        id: "pair4",
        claim: "Either you support my political candidate or you hate this country.",
        evidence: "False Dilemma: Presents a false choice between two extremes"
      }
    ]
  },
  {
    id: "arg5",
    title: "Strength of Arguments",
    description: "In a debate about implementing a four-day work week, which argument is strongest?",
    type: "fallacy",
    difficulty: "advanced",
    xpReward: 20,
    options: [
      {
        id: "arg5a",
        text: "It's obvious that a four-day work week is better because people hate working five days.",
        isCorrect: false,
        explanation: "Relies on emotional appeal and assumption"
      },
      {
        id: "arg5b",
        text: "Studies in multiple countries show similar or increased productivity with four-day work weeks, plus reduced burnout and lower operating costs.",
        isCorrect: true,
        explanation: "Uses specific evidence, multiple factors, and real-world data"
      },
      {
        id: "arg5c",
        text: "Every progressive company is moving to four-day weeks, so we'll look bad if we don't.",
        isCorrect: false,
        explanation: "Appeals to trends rather than merit"
      },
      {
        id: "arg5d",
        text: "Anyone who wants to work five days clearly doesn't value work-life balance.",
        isCorrect: false,
        explanation: "Creates a false character attack"
      }
    ]
  },
  {
    id: "arg6",
    title: "Identifying Hidden Assumptions",
    description: "\"Since the library's new late fee policy was implemented, book returns have decreased. The policy must be making people keep books longer.\"\n\nWhat's the key hidden assumption in this argument?",
    type: "fallacy",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "arg6a",
        text: "Libraries shouldn't charge late fees",
        isCorrect: false,
        explanation: "This is a separate debate, not an assumption in the argument"
      },
      {
        id: "arg6b",
        text: "People don't value library books",
        isCorrect: false,
        explanation: "Not assumed in the original argument"
      },
      {
        id: "arg6c",
        text: "The policy change is the only factor affecting return rates",
        isCorrect: true,
        explanation: "The argument assumes no other factors (like seasonal changes, COVID, etc.) could explain the decrease"
      },
      {
        id: "arg6d",
        text: "Higher fees lead to better compliance",
        isCorrect: false,
        explanation: "The argument actually suggests the opposite"
      }
    ]
  }
];
