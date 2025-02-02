import { useState } from "react";
import { Challenge } from "@/components/Challenge";
import { useQuery } from "@tanstack/react-query";
import { fetchAllChallenges } from "@/lib/queries";
import { Challenge as ChallengeType } from "@/data/challengeTypes";
import { toast } from "sonner";

export default function ThinkingTools() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  const { data: allChallenges = [], isLoading } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchAllChallenges,
  });

  // Filter challenges that start with SYS_LAT_ and sort by difficulty
  const challenges = allChallenges
    .filter((challenge: ChallengeType) => challenge.id.startsWith('sys_lat_'))
    .sort((a: ChallengeType, b: ChallengeType) => {
      const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });

  const handleChallengeComplete = (correct: boolean, xp: number) => {
    if (correct) {
      setCompletedChallenges(prev => {
        const newCompleted = new Set(prev);
        newCompleted.add(challenges[currentChallengeIndex].id);
        return newCompleted;
      });

      if (currentChallengeIndex < challenges.length - 1) {
        toast.success("Great job! Moving to the next challenge.");
        setCurrentChallengeIndex(prev => prev + 1);
      } else {
        toast.success("Congratulations! You've completed all challenges!");
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

  if (challenges.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">No challenges available</h1>
        <p className="text-gray-600">Please check back later for new challenges.</p>
      </div>
    );
  }

  const currentChallenge = challenges[currentChallengeIndex];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Thinking Tools Journey</h1>
        <p className="text-gray-600">
          Master systematic analysis and creative problem-solving techniques
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Challenge {currentChallengeIndex + 1} of {challenges.length}</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(completedChallenges.size / challenges.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <Challenge
        key={currentChallenge.id}
        {...currentChallenge}
        onComplete={handleChallengeComplete}
      />
    </div>
  );
};