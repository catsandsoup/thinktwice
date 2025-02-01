import { ProgressBar } from "./ProgressBar";

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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Beginner's Journey</h1>
        <div className="text-base sm:text-lg font-semibold">
          Challenge {currentChallenge + 1} of {totalChallenges}
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Total XP earned: {xp}
      </div>

      <ProgressBar xp={xp} maxXp={maxXp} streak={streak} />
    </div>
  );
}