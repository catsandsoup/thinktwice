import { memo } from "react";
import { Challenge as ChallengeType } from "@/data/challengeTypes";
import { StandardChallenge } from "./challenges/StandardChallenge";
import { WordSelectionChallenge } from "./WordSelectionChallenge";
import { MatchingChallenge } from "./MatchingChallenge";
import { HighlightChallenge } from "./HighlightChallenge";
import { ChallengeCard } from "./challenges/ChallengeCard";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <ChallengeCard challenge={props}>
        {renderChallenge()}
      </ChallengeCard>
    </motion.div>
  );
});