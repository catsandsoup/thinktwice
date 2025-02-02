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
  const checkAndAwardBadges = async (userId: string) => {
    try {
      // Check for first challenge completion
      const { count: challengeCount } = await supabase
        .from('completed_challenges')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (challengeCount === 1) {
        await awardBadge(userId, 'First Steps');
      }

      // Check for challenge champion (50 challenges)
      if (challengeCount === 50) {
        await awardBadge(userId, 'Challenge Champion');
      }

      // Check for perfect score
      if (props.xpReward === 10) { // Assuming 10 is max XP
        await awardBadge(userId, 'Perfect Score');
      }

      // Check streak
      const { data: achievements } = await supabase
        .from('user_achievements')
        .select('streak_count')
        .eq('user_id', userId)
        .single();

      if (achievements?.streak_count === 7) {
        await awardBadge(userId, 'Streak Master');
      }
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  const awardBadge = async (userId: string, badgeName: string) => {
    try {
      // Get badge ID
      const { data: badge } = await supabase
        .from('badges')
        .select('id')
        .eq('name', badgeName)
        .single();

      if (!badge) return;

      // Check if user already has the badge
      const { data: existingBadge } = await supabase
        .from('user_badges')
        .select('id')
        .eq('user_id', userId)
        .eq('badge_id', badge.id)
        .single();

      if (existingBadge) return;

      // Award new badge
      await supabase
        .from('user_badges')
        .insert({
          user_id: userId,
          badge_id: badge.id
        });

      toast.success(`New Achievement Unlocked: ${badgeName}! 🎉`, {
        duration: 4000
      });
    } catch (error) {
      console.error('Error awarding badge:', error);
    }
  };

  const handleComplete = async (correct: boolean, xp: number) => {
    if (correct) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Record the completed challenge
        const { error: completionError } = await supabase
          .from('completed_challenges')
          .insert({
            challenge_id: props.id,
            user_id: user.id,
            xp_earned: xp
          });

        if (completionError) throw completionError;

        // Check for achievements
        await checkAndAwardBadges(user.id);
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