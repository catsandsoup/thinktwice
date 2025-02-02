import { MatchingChallenge } from "./challengeTypes";

export const matchingChallenges: MatchingChallenge[] = [
  {
    id: "matching-1",
    title: "Evidence Matching",
    description: "Match each claim with its supporting evidence",
    type: "matching",
    difficulty: "beginner",
    xpReward: 100,
    pairs: [
      {
        id: "1",
        claim: "Electric cars reduce carbon emissions",
        evidence: "Lifecycle emissions analysis comparing multiple vehicle types"
      },
      {
        id: "2",
        claim: "This diet works better than others",
        evidence: "Randomized controlled trials with diverse participant groups"
      },
      {
        id: "3",
        claim: "Violent video games increase aggressive behavior",
        evidence: "Longitudinal behavioral studies with control groups"
      }
    ]
  }
];