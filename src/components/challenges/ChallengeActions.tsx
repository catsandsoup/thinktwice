
import { Button } from "@/components/ui/button";

type ChallengeActionsProps = {
  isSubmitted: boolean;
  isCorrect: boolean;
  showNextQuestion: boolean;
  wrongAttempts: number;
  showAnswer: boolean;
  onRetry: () => void;
  onSubmit: () => void;
  onToggleShowAnswer: () => void;
};

export function ChallengeActions({
  isSubmitted,
  isCorrect,
  showNextQuestion,
  wrongAttempts,
  showAnswer,
  onRetry,
  onSubmit,
  onToggleShowAnswer
}: ChallengeActionsProps) {
  return (
    <div className="flex gap-2">
      {isSubmitted && !isCorrect ? (
        <Button
          onClick={onRetry}
          className="flex-1"
          variant="secondary"
        >
          Try Again
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          className="flex-1"
          aria-label={showNextQuestion ? "Proceed to next question" : "Submit your answer"}
        >
          {showNextQuestion ? "Next Question" : "Submit Answer"}
        </Button>
      )}

      {wrongAttempts >= 3 && !showNextQuestion && (
        <Button
          variant="outline"
          onClick={onToggleShowAnswer}
          className="whitespace-nowrap"
        >
          {showAnswer ? "Hide Answer" : "Display Answer"}
        </Button>
      )}
    </div>
  );
}
