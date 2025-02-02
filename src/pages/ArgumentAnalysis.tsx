import { useState, useEffect } from "react";
import { Challenge } from "@/components/Challenge";
import { QuizHeader } from "@/components/QuizHeader";
import { argumentAnalysisChallenges } from "@/data/challenges/argumentAnalysis";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { shuffleArray } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const ArgumentAnalysis = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [randomizedChallenges, setRandomizedChallenges] = useState(argumentAnalysisChallenges);

  useEffect(() => {
    setRandomizedChallenges(shuffleArray(argumentAnalysisChallenges));
  }, []);

  const awardPathBadge = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get badge ID for Critical Thinker badge
      const { data: badge } = await supabase
        .from('badges')
        .select('id')
        .eq('name', 'Critical Thinker')
        .single();

      if (!badge) return;

      // Check if user already has the badge
      const { data: existingBadge } = await supabase
        .from('user_badges')
        .select('id')
        .eq('user_id', user.id)
        .eq('badge_id', badge.id)
        .single();

      if (!existingBadge) {
        // Award new badge
        await supabase
          .from('user_badges')
          .insert({
            user_id: user.id,
            badge_id: badge.id
          });

        toast.success('New Achievement Unlocked: Critical Thinker! 🎉', {
          duration: 4000
        });
      }
    } catch (error) {
      console.error('Error awarding path badge:', error);
    }
  };

  const handleChallengeComplete = async (correct: boolean, xp: number) => {
    const currentChallenge = randomizedChallenges[currentChallengeIndex];
    
    if (correct) {
      toast.success(`Well done! You earned ${xp} XP!`, {
        duration: 3000
      });
      setCompletedChallenges([...completedChallenges, currentChallenge.id]);

      // Update user achievements
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('user_achievements')
          .update({
            total_challenges_completed: completedChallenges.length + 1,
            last_activity_date: new Date().toISOString()
          })
          .eq('user_id', user.id);

        // Record completed challenge
        await supabase
          .from('completed_challenges')
          .insert({
            user_id: user.id,
            challenge_id: currentChallenge.id,
            xp_earned: xp
          });
      }
    } else {
      toast.error("That's not quite right. Try again!", {
        duration: 3000
      });
      return;
    }

    if (currentChallengeIndex < randomizedChallenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    } else {
      await awardPathBadge();
      toast.success("Congratulations! You've completed all the argument analysis challenges!", {
        duration: 3000
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <div className="container px-4 py-4 space-y-4">
        <QuizHeader
          title="Argument Analysis"
          currentQuestion={currentChallengeIndex + 1}
          totalQuestions={randomizedChallenges.length}
        />

        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex-1 h-2 bg-secondary rounded-full">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(completedChallenges.length / randomizedChallenges.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentChallengeIndex < randomizedChallenges.length && (
            <Challenge
              key={randomizedChallenges[currentChallengeIndex].id}
              {...randomizedChallenges[currentChallengeIndex]}
              onComplete={handleChallengeComplete}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ArgumentAnalysis;