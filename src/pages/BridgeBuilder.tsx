import { useState } from "react";
import { Challenge } from "@/components/Challenge";
import { QuizHeader } from "@/components/QuizHeader";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function BridgeBuilder() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const { data: allChallenges = [], isLoading } = useQuery({
    queryKey: ['bridge-builder-challenges'],
    queryFn: async () => {
      // First get the Bridge Builder journey ID
      const { data: journey } = await supabase
        .from('journeys')
        .select('id')
        .eq('title', 'Bridge Builder')
        .single();

      if (!journey) throw new Error('Bridge Builder journey not found');

      // Then fetch only challenges for this journey
      const { data: challenges } = await supabase
        .from('challenges')
        .select(`
          *,
          standard_challenge_options (*),
          matching_challenges (
            id,
            matching_pairs (*)
          ),
          highlight_challenges (
            id,
            statement,
            highlight_texts (*)
          ),
          word_selection_challenges (
            id,
            passage,
            word_selection_keywords (*)
          )
        `)
        .eq('journey_id', journey.id)
        .order('difficulty');

      // Map database fields to our frontend types and ensure type safety
      return challenges?.map(challenge => {
        const baseChallenge = {
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          type: challenge.type,
          difficulty: challenge.difficulty,
          xpReward: challenge.xp_reward
        };

        switch (challenge.type) {
          case "highlight":
            return {
              ...baseChallenge,
              type: "highlight" as const,
              statement: challenge.highlight_challenges?.[0]?.statement || '',
              highlights: challenge.highlight_challenges?.[0]?.highlight_texts?.map(ht => ({
                text: ht.text,
                explanation: ht.explanation
              })) || []
            };
          case "matching":
            return {
              ...baseChallenge,
              type: "matching" as const,
              pairs: challenge.matching_challenges?.[0]?.matching_pairs?.map(pair => ({
                id: pair.id,
                claim: pair.claim,
                evidence: pair.evidence
              })) || []
            };
          case "word-selection":
            return {
              ...baseChallenge,
              type: "word-selection" as const,
              passage: challenge.word_selection_challenges?.[0]?.passage || '',
              keyWords: challenge.word_selection_challenges?.[0]?.word_selection_keywords?.map(kw => ({
                word: kw.word,
                explanation: kw.explanation
              })) || []
            };
          default:
            return {
              ...baseChallenge,
              type: challenge.type as "headline" | "fallacy" | "media" | "source",
              options: challenge.standard_challenge_options?.map(opt => ({
                id: opt.id,
                text: opt.text,
                isCorrect: opt.is_correct,
                explanation: opt.explanation
              })) || []
            };
        }
      }) || [];
    },
  });

  const handleChallengeComplete = async (correct: boolean, xp: number) => {
    if (correct) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Record the completed challenge
        const { error: completionError } = await supabase
          .from('completed_challenges')
          .insert({
            challenge_id: allChallenges[currentChallengeIndex].id,
            user_id: user.id,
            xp_earned: xp
          });

        if (completionError) throw completionError;

        // Update completed challenges state
        setCompletedChallenges(prev => {
          const newCompleted = new Set(prev);
          newCompleted.add(allChallenges[currentChallengeIndex].id);
          return newCompleted;
        });

        // Check if this was the last challenge
        if (currentChallengeIndex === allChallenges.length - 1) {
          toast.success("Congratulations! You've completed all challenges! 🎉");
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          toast.success("Great job! Moving to the next challenge.");
          // Ensure state update happens after the animation
          setTimeout(() => {
            setCurrentChallengeIndex(currentChallengeIndex + 1);
          }, 300);
        }
      } catch (error) {
        console.error('Error updating progress:', error);
        toast.error("Failed to save progress");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!allChallenges || allChallenges.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">No challenges available</h1>
        <p className="text-gray-600">Please check back later for new challenges.</p>
      </div>
    );
  }

  const currentChallenge = allChallenges[currentChallengeIndex];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <QuizHeader 
        title="Bridge Builder Journey"
        currentQuestion={currentChallengeIndex + 1}
        totalQuestions={allChallenges.length}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bridge Builder Journey</h1>
        <p className="text-gray-600">
          Master the art of balancing emotional and logical thinking
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Challenge {currentChallengeIndex + 1} of {allChallenges.length}</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(completedChallenges.size / allChallenges.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentChallenge.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Challenge
            {...currentChallenge}
            onComplete={handleChallengeComplete}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}