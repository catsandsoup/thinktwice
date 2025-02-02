import { memo } from "react";
import { Challenge as ChallengeType } from "@/data/challengeTypes";
import { StandardChallenge } from "./challenges/StandardChallenge";
import { WordSelectionChallenge } from "./WordSelectionChallenge";
import { MatchingChallenge } from "./MatchingChallenge";
import { HighlightChallenge } from "./HighlightChallenge";
import { ChallengeCard } from "./challenges/ChallengeCard";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { recordChallengeCompletion, updateUserAchievements } from "@/utils/challengeUtils";

type ChallengeProps = ChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export const Challenge = memo(function Challenge(props: ChallengeProps) {
  const handleComplete = async (correct: boolean, xp: number) => {
    if (correct) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { success, alreadyCompleted, error } = await recordChallengeCompletion(
          user.id,
          props.id,
          xp
        );

        if (!success) {
          toast.error("Failed to save progress. Please try again.");
          return;
        }

        if (!alreadyCompleted) {
          await updateUserAchievements(user.id);
        }
      } catch (error) {
        console.error('Error updating progress:', error);
        toast.error("Failed to save progress. Please try again.");
      }
    }

    props.onComplete(correct, xp);
  };

  const renderChallenge = () => {
    switch (props.type) {
      case "word-selection":
        return <WordSelectionChallenge {...props} onComplete={handleComplete} />;
      case "matching":
        return <MatchingChallenge {...props} onComplete={handleComplete} />;
      case "highlight":
        return <HighlightChallenge {...props} onComplete={handleComplete} />;
      default:
        return <StandardChallenge {...props} onComplete={handleComplete} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <ChallengeCard challenge={props}>
        {renderChallenge()}
      </ChallengeCard>
    </motion.div>
  );
});