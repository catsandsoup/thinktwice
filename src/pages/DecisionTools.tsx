import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Challenge } from "@/components/Challenge";
import { QuizHeader } from "@/components/QuizHeader";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

export default function DecisionTools() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const navigate = useNavigate();

  const { data: challenges = [], isLoading } = useQuery({
    queryKey: ['decision-tools-challenges'],
    queryFn: async () => {
      const { data: journey } = await supabase
        .from('journeys')
        .select('id')
        .eq('title', 'Decision Making Tools')
        .single();

      if (!journey) throw new Error('Journey not found');

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
      return challenges || [];
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

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <QuizHeader 
        title="Decision Making Tools"
        currentQuestion={currentChallenge + 1}
        totalQuestions={challenges.length}
        scenario="Master practical tools and frameworks for better decision making"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={challenges[currentChallenge].id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Challenge
            {...challenges[currentChallenge]}
            onComplete={handleComplete}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}