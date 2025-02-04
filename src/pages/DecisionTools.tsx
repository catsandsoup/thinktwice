import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Challenge } from "@/components/Challenge";
import { QuizHeader } from "@/components/QuizHeader";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Challenge as ChallengeType } from "@/data/challengeTypes";

export default function DecisionTools() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const navigate = useNavigate();

  const { data: challenges = [], isLoading } = useQuery({
    queryKey: ['decision-tools-challenges'],
    queryFn: async () => {
      const { data: journey, error: journeyError } = await supabase
        .from('journeys')
        .select('id')
        .eq('title', 'Decision Making Tools')
        .maybeSingle();

      if (journeyError) throw journeyError;
      if (!journey) {
        toast.error("Journey not found");
        navigate('/');
        return [];
      }

      const { data: challenges, error } = await supabase
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

      if (error) throw error;

      return (challenges || []).map(challenge => {
        const baseChallenge = {
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          type: challenge.type,
          difficulty: challenge.difficulty,
          xpReward: challenge.xp_reward
        };

        switch (challenge.type) {
          case 'highlight':
            return {
              ...baseChallenge,
              type: 'highlight' as const,
              statement: challenge.highlight_challenges?.[0]?.statement || '',
              highlights: challenge.highlight_challenges?.[0]?.highlight_texts?.map(ht => ({
                text: ht.text,
                explanation: ht.explanation
              })) || []
            };
          case 'matching':
            return {
              ...baseChallenge,
              type: 'matching' as const,
              pairs: challenge.matching_challenges?.[0]?.matching_pairs?.map(pair => ({
                id: pair.id,
                claim: pair.claim,
                evidence: pair.evidence
              })) || []
            };
          case 'word-selection':
            return {
              ...baseChallenge,
              type: 'word-selection' as const,
              passage: challenge.word_selection_challenges?.[0]?.passage || '',
              keyWords: challenge.word_selection_challenges?.[0]?.word_selection_keywords?.map(kw => ({
                word: kw.word,
                explanation: kw.explanation
              })) || []
            };
          default:
            return {
              ...baseChallenge,
              type: challenge.type,
              options: challenge.standard_challenge_options?.map(opt => ({
                id: opt.id,
                text: opt.text,
                isCorrect: opt.is_correct,
                explanation: opt.explanation
              })) || []
            };
        }
      }) as ChallengeType[];
    },
  });

  const handleComplete = async (correct: boolean) => {
    if (correct) {
      if (currentChallenge === challenges.length - 1) {
        toast.success("Congratulations! You've completed all challenges! 🎉");
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.success("Great job! Moving to the next challenge.");
        setCurrentChallenge(prev => prev + 1);
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

  if (!challenges || challenges.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">No challenges available</h1>
        <p className="text-muted-foreground">Please check back later for new challenges.</p>
      </div>
    );
  }

  const currentChallengeData = challenges[currentChallenge];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <QuizHeader 
        title="Decision Making Tools"
        currentQuestion={currentChallenge + 1}
        totalQuestions={challenges.length}
        scenario="Learn to make informed decisions using various tools"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentChallengeData.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Challenge
            {...currentChallengeData}
            onComplete={handleComplete}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
