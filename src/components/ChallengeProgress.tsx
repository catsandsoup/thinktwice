interface ChallengeProgressProps {
  currentChallenge: number;
  totalChallenges: number;
}

export function ChallengeProgress({ 
  currentChallenge, 
  totalChallenges
}: ChallengeProgressProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-display font-medium text-purple-900">
          Argument Analysis
        </h1>
        <span className="text-sm font-medium text-purple-700 bg-purple-50/80 px-3 py-1 rounded-full">
          {currentChallenge} of {totalChallenges}
        </span>
      </div>
    </div>
  );
}