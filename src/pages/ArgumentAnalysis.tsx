import { useState } from "react";
import { Challenge } from "@/components/Challenge";
import { QuizHeader } from "@/components/QuizHeader";
import { argumentAnalysisChallenges } from "@/data/challenges/argumentAnalysis";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ArgumentAnalysis = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const handleChallengeComplete = (correct: boolean, xp: number) => {
    const currentChallenge = argumentAnalysisChallenges[currentChallengeIndex];
    
    if (correct) {
      toast.success(`Well done! You earned ${xp} XP!`);
      setCompletedChallenges([...completedChallenges, currentChallenge.id]);
    } else {
      toast.error("That's not quite right. Try again!");
      return;
    }

    if (currentChallengeIndex < argumentAnalysisChallenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    } else {
      toast.success("Congratulations! You've completed all the argument analysis challenges!");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container px-4 space-y-8">
        <QuizHeader
          title="Argument Analysis"
          currentQuestion={currentChallengeIndex + 1}
          totalQuestions={argumentAnalysisChallenges.length}
        />

        <AnimatePresence mode="wait">
          {currentChallengeIndex < argumentAnalysisChallenges.length && (
            <Challenge
              key={argumentAnalysisChallenges[currentChallengeIndex].id}
              {...argumentAnalysisChallenges[currentChallengeIndex]}
              onComplete={handleChallengeComplete}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ArgumentAnalysis;