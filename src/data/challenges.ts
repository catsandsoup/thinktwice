import { Challenge } from "./challengeTypes";
import { standardChallenges } from "./standardChallenges";
import { wordSelectionChallenges } from "./wordSelectionChallenges";
import { matchingChallenges } from "./matchingChallenges";
import { highlightChallenges } from "./highlightChallenges";

export * from "./challengeTypes";

export const challenges: Challenge[] = [
  ...standardChallenges,
  ...wordSelectionChallenges,
  ...matchingChallenges,
  ...highlightChallenges,
];