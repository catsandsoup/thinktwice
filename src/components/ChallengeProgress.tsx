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
  totalChallenges
}: ChallengeProgressProps) {
  return (
    <div className="space-y-6 bg-purple-50 p-6 rounded-lg shadow-sm">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
          <span className="text-purple-700 font-medium">
            Challenge {currentChallenge + 1} of {totalChallenges}
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-900">
          Beginner's Journey
        </h1>
      </div>
    </div>
  );
}