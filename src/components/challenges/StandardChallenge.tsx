
import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { StandardChallenge as StandardChallengeType } from "@/data/challengeTypes";
import { toast } from "sonner";
import { ChallengeOption } from "./ChallengeOption";
import { ChallengeFeedback } from "./ChallengeFeedback";
import { AnswerDisplay } from "./AnswerDisplay";

type StandardChallengeProps = StandardChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export function StandardChallenge(props: StandardChallengeProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctOptions = props.options.filter(opt => opt.isCorrect);
  const isMultipleChoice = correctOptions.length > 1;

  const handleSelect = (optionId: string) => {
    if (isSubmitted) return;
    
    if (isMultipleChoice) {
      setSelected(prev => {
        if (prev.includes(optionId)) {
          return prev.filter(id => id !== optionId);
        }
        return [...prev, optionId];
      });
    } else {
      setSelected([optionId]);
    }
  };

  const handleSubmit = () => {
    if (selected.length === 0 && !isSubmitted) {
      toast.error("Please select an answer before submitting");
      return;
    }

    if (showNextQuestion) {
      props.onComplete(true, props.xpReward);
      setSelected([]);
      setIsSubmitted(false);
      setIsCorrect(false);
      setShowNextQuestion(false);
      setWrongAttempts(0);
      setShowAnswer(false);
      return;
    }

    const selectedOptions = props.options.filter(opt => selected.includes(opt.id));
    
    const isAllCorrect = isMultipleChoice
      ? correctOptions.length === selectedOptions.length &&
        selectedOptions.every(opt => opt.isCorrect)
      : selectedOptions.length === 1 && selectedOptions[0].isCorrect;
    
    setIsSubmitted(true);
    setIsCorrect(isAllCorrect);
    
    if (isAllCorrect) {
      setShowNextQuestion(true);
      setShowFeedback(true);
      setWrongAttempts(0);
    } else {
      setWrongAttempts(prev => prev + 1);
      toast.error("That's not quite right. Try again!");
    }
  };

  const handleRetry = () => {
    setSelected([]);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowNextQuestion(false);
    setShowAnswer(false);
  };

  return (
    <div className="space-y-4">
      {isMultipleChoice && !isSubmitted && (
        <p className="text-sm text-muted-foreground italic">
          Select all answers that apply
        </p>
      )}

      <div className="space-y-4">
        {isMultipleChoice ? (
          props.options.map((option) => (
            <ChallengeOption
              key={option.id}
              option={option}
              isMultipleChoice={true}
              isSelected={selected.includes(option.id)}
              isSubmitted={isSubmitted}
              onSelect={handleSelect}
            />
          ))
        ) : (
          <RadioGroup
            value={selected[0]}
            onValueChange={(value) => handleSelect(value)}
            disabled={isSubmitted}
            className="space-y-4"
          >
            {props.options.map((option) => (
              <ChallengeOption
                key={option.id}
                option={option}
                isMultipleChoice={false}
                isSelected={selected.includes(option.id)}
                isSubmitted={isSubmitted}
                onSelect={handleSelect}
              />
            ))}
          </RadioGroup>
        )}
      </div>

      <div className="flex gap-2">
        {isSubmitted && !isCorrect ? (
          <Button
            onClick={handleRetry}
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
            onClick={() => setShowAnswer(!showAnswer)}
            className="whitespace-nowrap"
          >
            {showAnswer ? "Hide Answer" : "Display Answer"}
          </Button>
        )}
      </div>

      {showAnswer && <AnswerDisplay correctOptions={correctOptions} />}

      {showFeedback && (
        <ChallengeFeedback 
          challengeId={props.id} 
          onClose={() => setShowFeedback(false)} 
        />
      )}
    </div>
  );
}
