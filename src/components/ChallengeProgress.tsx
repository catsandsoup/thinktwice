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
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-purple-600 font-medium">
            Detective Challenge {currentChallenge + 1}/{totalChallenges}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-600">{xp} stars earned</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold">Beginner's Journey</h1>
      </div>
      
      <ProgressBar xp={xp} maxXp={maxXp} streak={streak} />
    </div>
  );
}