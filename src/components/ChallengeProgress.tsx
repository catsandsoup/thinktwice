interface ChallengeProgressProps {
  currentChallenge: number;
  totalChallenges: number;
}

export function ChallengeProgress({ 
  currentChallenge, 
  totalChallenges
}: ChallengeProgressProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <span className="text-sm font-medium text-purple-700 bg-purple-50/80 px-3 py-1 rounded-full">
        {currentChallenge} of {totalChallenges}
      </span>
    </div>
  );
}