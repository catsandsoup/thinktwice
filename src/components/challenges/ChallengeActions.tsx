
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ChallengeActionsProps = {
  isSubmitted: boolean;
  isCorrect: boolean;
  showNextQuestion: boolean;
  wrongAttempts: number;
  showAnswer: boolean;
  hasSelection: boolean; // New prop to check if an answer is selected
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
  hasSelection,
  onRetry,
  onSubmit,
  onToggleShowAnswer
}: ChallengeActionsProps) {
  const handleSubmit = () => {
    // Check if an answer is selected before allowing submission
    if (!hasSelection && !showNextQuestion) {
      toast.error("Please select an answer before submitting");
      return;
    }
    onSubmit();
  };

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
          onClick={handleSubmit}
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
