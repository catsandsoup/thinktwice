
import { StandardChallenge as StandardChallengeType } from "@/data/challengeTypes";
import { ChallengeFeedback } from "./ChallengeFeedback";
import { AnswerDisplay } from "./AnswerDisplay";
import { ChallengeOptions } from "./ChallengeOptions";
import { ChallengeActions } from "./ChallengeActions";
import { useStandardChallenge } from "./useStandardChallenge";

type StandardChallengeProps = StandardChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export function StandardChallenge(props: StandardChallengeProps) {
  const {
    selected,
    isSubmitted,
    showAnswer,
    showFeedback,
    wrongAttempts,
    isCorrect,
    showNextQuestion,
    correctOptions,
    isMultipleChoice,
    handleSelect,
    handleSubmit,
    handleRetry,
    toggleShowAnswer,
    closeFeedback
  } = useStandardChallenge(props.options, props.onComplete, props.xpReward);

  return (
    <div className="space-y-4">
      {isMultipleChoice && !isSubmitted && (
        <p className="text-sm text-muted-foreground italic">
          Select all answers that apply
        </p>
      )}

      <ChallengeOptions
        options={props.options}
        isMultipleChoice={isMultipleChoice}
        isSubmitted={isSubmitted}
        selected={selected}
        onSelect={handleSelect}
      />

      <ChallengeActions
        isSubmitted={isSubmitted}
        isCorrect={isCorrect}
        showNextQuestion={showNextQuestion}
        wrongAttempts={wrongAttempts}
        showAnswer={showAnswer}
        onRetry={handleRetry}
        onSubmit={handleSubmit}
        onToggleShowAnswer={toggleShowAnswer}
      />

      {showAnswer && <AnswerDisplay correctOptions={correctOptions} />}

      {showFeedback && (
        <ChallengeFeedback 
          challengeId={props.id} 
          onClose={closeFeedback} 
        />
      )}
    </div>
  );
}
