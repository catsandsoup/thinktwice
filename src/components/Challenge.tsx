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

type ChallengeProps = ChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export const Challenge = memo(function Challenge(props: ChallengeProps) {
  const handleComplete = async (correct: boolean, xp: number) => {
    if (correct) {
      try {
        // Record the completed challenge
        const { error: completionError } = await supabase
          .from('completed_challenges')
          .insert({
            challenge_id: props.id,
            xp_earned: xp
          });

        if (completionError) throw completionError;

        // Check for new badges
        const { data: newBadges } = await supabase
          .from('user_badges')
          .select('badges (name)')
          .order('earned_at', { ascending: false })
          .limit(1);

        if (newBadges && newBadges.length > 0) {
          toast.success(`New badge earned: ${newBadges[0].badges.name}!`, {
            duration: 3000
          });
        }
      } catch (error) {
        console.error('Error updating progress:', error);
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