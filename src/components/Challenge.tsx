import { memo } from "react";
import { Challenge as ChallengeType } from "@/data/challengeTypes";
import { StandardChallenge } from "./challenges/StandardChallenge";
import { WordSelectionChallenge } from "./WordSelectionChallenge";
import { MatchingChallenge } from "./MatchingChallenge";
import { HighlightChallenge } from "./HighlightChallenge";
import { ChallengeCard } from "./challenges/ChallengeCard";

type ChallengeProps = ChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export const Challenge = memo(function Challenge(props: ChallengeProps) {
  const renderChallenge = () => {
    switch (props.type) {
      case "word-selection":
        return <WordSelectionChallenge {...props} />;
      case "matching":
        return <MatchingChallenge {...props} />;
      case "highlight":
        return <HighlightChallenge {...props} />;
      default:
        return <StandardChallenge {...props} />;
    }
  };

  return (
    <ChallengeCard challenge={props}>
      {renderChallenge()}
    </ChallengeCard>
  );
});