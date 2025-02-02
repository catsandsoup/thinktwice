import { useState, useEffect } from "react";
import { Challenge } from "@/components/Challenge";
import { QuizHeader } from "@/components/QuizHeader";
import { argumentAnalysisChallenges } from "@/data/challenges/argumentAnalysis";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { shuffleArray } from "@/lib/utils";

const ArgumentAnalysis = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [randomizedChallenges, setRandomizedChallenges] = useState(argumentAnalysisChallenges);

  useEffect(() => {
    setRandomizedChallenges(shuffleArray(argumentAnalysisChallenges));
  }, []);

  const handleChallengeComplete = (correct: boolean, xp: number) => {
    const currentChallenge = randomizedChallenges[currentChallengeIndex];
    
    if (correct) {
      toast.success(`Well done! You earned ${xp} XP!`, {
        duration: 3000
      });
      setCompletedChallenges([...completedChallenges, currentChallenge.id]);
    } else {
      toast.error("That's not quite right. Try again!", {
        duration: 3000
      });
      return;
    }

    if (currentChallengeIndex < randomizedChallenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    } else {
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Argument Analysis</h1>
          <p className="text-muted-foreground">
            Master the art of analyzing and evaluating arguments
          </p>
        </div>

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