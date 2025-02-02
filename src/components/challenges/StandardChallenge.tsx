import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { StandardChallenge as StandardChallengeType } from "@/data/challengeTypes";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type StandardChallengeProps = StandardChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export function StandardChallenge(props: StandardChallengeProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const correctOptions = props.options.filter(opt => opt.isCorrect);
  const isMultipleChoice = correctOptions.length > 1;

  const handleSelect = (optionId: string) => {
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
      return;
    }

    if (isSubmitted && isCorrect) {
      props.onComplete(true, props.xpReward);
      // Reset state for next question
      setSelected([]);
      setIsSubmitted(false);
      setIsCorrect(false);
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
      props.onComplete(true, props.xpReward);
    }
  };

  const handleRetry = () => {
    setSelected([]);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {isMultipleChoice ? (
          props.options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "flex items-start space-x-3 p-4 rounded-lg border transition-colors",
                isSubmitted && option.isCorrect && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
                isSubmitted && selected.includes(option.id) && !option.isCorrect && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
              )}
            >
              <div className="flex items-center h-5">
                <Checkbox
                  id={option.id}
                  checked={selected.includes(option.id)}
                  onCheckedChange={() => handleSelect(option.id)}
                  disabled={isSubmitted && isCorrect}
                />
              </div>
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor={option.id}
                  className="text-sm font-medium cursor-pointer"
                >
                  {option.text}
                </Label>
                {isSubmitted && (selected.includes(option.id) || option.isCorrect) && (
                  <p className={cn(
                    "text-sm mt-1",
                    option.isCorrect ? "text-green-600" : "text-red-600"
                  )}>
                    {option.explanation}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <RadioGroup
            value={selected[0]}
            onValueChange={(value) => handleSelect(value)}
            disabled={isSubmitted && isCorrect}
          >
            {props.options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex items-start space-x-3 p-4 rounded-lg border transition-colors",
                  isSubmitted && option.isCorrect && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
                  isSubmitted && selected.includes(option.id) && !option.isCorrect && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                )}
              >
                <div className="flex items-center h-5">
                  <RadioGroupItem value={option.id} id={option.id} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor={option.id}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {option.text}
                  </Label>
                  {isSubmitted && (selected.includes(option.id) || option.isCorrect) && (
                    <p className={cn(
                      "text-sm mt-1",
                      option.isCorrect ? "text-green-600" : "text-red-600"
                    )}>
                      {option.explanation}
                    </p>
                  )}
                </div>
              </div>
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
            aria-label={isSubmitted && isCorrect ? "Proceed to next question" : "Submit your answer"}
          >
            {isSubmitted && isCorrect ? "Next Question" : "Submit Answer"}
          </Button>
        )}
      </div>
    </div>
  );
}