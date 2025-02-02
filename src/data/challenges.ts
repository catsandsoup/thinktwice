import { Challenge } from "./challengeTypes";
import { argumentAnalysisChallenges } from "./challenges/argumentAnalysis";
import { matchingChallenges } from "./challenges/matchingChallenges";
import { wordSelectionChallenges } from "./challenges/wordSelectionChallenges";
import { strengthAnalysisChallenges } from "./challenges/strengthAnalysis";

export const beginnerChallenges: Challenge[] = [
  ...argumentAnalysisChallenges.filter(c => c.difficulty === "beginner")
];

export const advancedChallenges: Challenge[] = [
  ...argumentAnalysisChallenges.filter(c => c.difficulty === "advanced"),
  ...strengthAnalysisChallenges.filter(c => c.difficulty === "advanced"),
  ...wordSelectionChallenges.filter(c => c.difficulty === "advanced")
];

export const modernChallenges: Challenge[] = [
  ...matchingChallenges,
  ...strengthAnalysisChallenges.filter(c => c.difficulty === "intermediate")
];

// Helper function to remove duplicates based on challenge ID
const removeDuplicates = (challenges: Challenge[]): Challenge[] => {
  const seen = new Set<string>();
  return challenges.filter(challenge => {
    if (seen.has(challenge.id)) {
      console.warn(`Duplicate challenge ID found: ${challenge.id}`);
      return false;
    }
    seen.add(challenge.id);
    return true;
  });
};

export const allChallenges: Challenge[] = removeDuplicates([
  ...beginnerChallenges,
  ...advancedChallenges,
  ...modernChallenges
]);