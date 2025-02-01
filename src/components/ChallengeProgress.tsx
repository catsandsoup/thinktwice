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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Beginner's Journey</h1>
        <div className="text-lg font-semibold">
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