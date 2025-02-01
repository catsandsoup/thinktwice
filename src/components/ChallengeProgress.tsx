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
    <div className="space-y-3">
      <div className="text-center space-y-2">
        <div className="text-base text-muted-foreground font-medium">
          Challenge {currentChallenge + 1} of {totalChallenges}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold">Beginner's Journey</h1>
      </div>
      
      <div className="text-sm text-muted-foreground text-center">
        Total XP earned: {xp}
      </div>

      <ProgressBar xp={xp} maxXp={maxXp} streak={streak} />
    </div>
  );
}