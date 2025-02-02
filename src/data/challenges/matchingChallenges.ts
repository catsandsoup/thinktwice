import { Challenge } from "../challengeTypes";

export const matchingChallenges: Challenge[] = [
  {
    id: "match1",
    title: "Real-World Fallacy Recognition",
    description: "Match these common social situations with the logical fallacies they demonstrate.",
    type: "matching",
    difficulty: "intermediate",
    xpReward: 15,
    pairs: [
      {
        id: "m1",
        claim: "If you really cared about the environment, you'd never use a car.",
        evidence: "No True Scotsman - The \"true environmentalist\" argument creates an unrealistic purity test"
      },
      {
        id: "m2",
        claim: "Everyone's investing in crypto now, so it must be a good idea.",
        evidence: "Bandwagon Appeal - Relies on popularity rather than merit"
      },
      {
        id: "m3",
        claim: "That research can't be trusted because the scientist once worked for a corporation.",
        evidence: "Ad Hominem - Attacks the researcher's background instead of the research"
      },
      {
        id: "m4",
        claim: "Either you support my political candidate or you hate this country.",
        evidence: "False Dilemma - Presents a false choice between two extremes"
      }
    ]
  }
];