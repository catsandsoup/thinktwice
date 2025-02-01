import { StandardChallenge } from "./challengeTypes";
import { headlineChallenges } from "./challenges/headline";
import { fallacyChallenges } from "./challenges/fallacy";
import { mediaChallenges } from "./challenges/media";
import { sourceChallenges } from "./challenges/source";

export const standardChallenges: StandardChallenge[] = [
  ...headlineChallenges,
  ...fallacyChallenges,
  ...mediaChallenges,
  ...sourceChallenges,
];