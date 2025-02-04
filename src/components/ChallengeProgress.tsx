import { ThinkingLevel } from "@/utils/thinkingFramework";
import { Progress } from "@/components/ui/progress";

interface ChallengeProgressProps {
  currentChallenge: number;
  totalChallenges: number;
  thinkingLevel: ThinkingLevel;
}

export function ChallengeProgress({ 
  currentChallenge, 
  totalChallenges,
  thinkingLevel
}: ChallengeProgressProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
          Practice {currentChallenge} of {totalChallenges}
        </span>
        <span className="text-sm text-muted-foreground">
          Thinking Level {thinkingLevel}
        </span>
      </div>
      <Progress value={(currentChallenge / totalChallenges) * 100} className="h-2" />
    </div>
  );
}