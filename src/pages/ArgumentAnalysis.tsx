import { useState } from "react";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { argumentAnalysisChallenges } from "@/data/challenges/argumentAnalysis";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";

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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Argument Analysis</h1>
          <p className="text-xl text-gray-600">
            Master the art of evaluating and constructing sound arguments
          </p>
        </div>

        <ChallengeProgress
          currentChallenge={completedChallenges.length + 1}
          totalChallenges={argumentAnalysisChallenges.length}
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
    </div>
  );
};

export default ArgumentAnalysis;