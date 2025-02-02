interface ChallengeProgressProps {
  currentChallenge: number;
  totalChallenges: number;
}

export function ChallengeProgress({ 
  currentChallenge, 
  totalChallenges
}: ChallengeProgressProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-3 space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium text-purple-900">
          Beginner's Journey
        </h1>
        <span className="text-sm text-purple-700 bg-purple-50/80 px-3 py-1 rounded-full">
          {currentChallenge + 1} of {totalChallenges}
        </span>
      </div>
    </div>
  );
}