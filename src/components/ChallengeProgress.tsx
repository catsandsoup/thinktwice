import { ProgressBar } from "./ProgressBar";
import { Star } from "lucide-react";

interface ChallengeProgressProps {
  currentChallenge: number;
  totalChallenges: number;
  xp: number;
  maxXp: number;
  streak: number;
}

export function ChallengeProgress({ 
  currentChallenge, 
  totalChallenges, 
  xp, 
  maxXp, 
  streak 
}: ChallengeProgressProps) {
  return (
    <div className="space-y-6 bg-purple-50 p-6 rounded-lg shadow-sm">
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded-full">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-semibold text-purple-900">Level {streak}</h2>
              <p className="text-sm text-purple-700">{xp} / {maxXp} stars</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
            <span className="text-purple-700 font-medium">
              Challenge {currentChallenge + 1} of {totalChallenges}
            </span>
          </div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-900">
          Beginner's Journey
        </h1>
        
        <ProgressBar xp={xp} maxXp={maxXp} streak={streak} />
      </div>
    </div>
  );
}