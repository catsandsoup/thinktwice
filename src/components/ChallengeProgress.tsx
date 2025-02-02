interface ChallengeProgressProps {
  currentChallenge: number;
  totalChallenges: number;
}

export function ChallengeProgress({ 
  currentChallenge, 
  totalChallenges
}: ChallengeProgressProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center">
          <span className="text-purple-600 font-medium">
            Detective Challenge {currentChallenge + 1}/{totalChallenges}
          </span>
        </div>
      </div>
    </div>
  );
}