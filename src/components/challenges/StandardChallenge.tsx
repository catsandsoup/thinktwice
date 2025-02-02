import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { StandardChallenge as StandardChallengeType } from "@/data/challengeTypes";
import { Label } from "@/components/ui/label";

type StandardChallengeProps = StandardChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export function StandardChallenge(props: StandardChallengeProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const { toast } = useToast();

  // Determine if this is a multiple choice question based on number of correct answers
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
      toast({
        title: "Selection Required",
        description: "Please select at least one answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (isSubmitted && isCorrect) {
      setSelected([]);
      setIsSubmitted(false);
      setIsCorrect(false);
      props.onComplete(true, props.xpReward);
      return;
    }

    const selectedOptions = props.options.filter(opt => selected.includes(opt.id));
    
    const isAllCorrect = isMultipleChoice
      ? correctOptions.length === selectedOptions.length &&
        selectedOptions.every(opt => opt.isCorrect)
      : selectedOptions.length === 1 && selectedOptions[0].isCorrect;
    
    if (!isAllCorrect) {
      setIsSubmitted(false);
      setSelected([]);
      toast({
        title: "Incorrect - Try Again",
        description: isMultipleChoice 
          ? "Some of your selections were incorrect. Please try again."
          : "That's not the correct answer. Please try again.",
        variant: "destructive",
      });
    } else {
      setIsSubmitted(true);
      setIsCorrect(true);
      toast({
        title: "Correct! 🎉",
        description: "You've identified all the correct answers!",
        variant: "default",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {isMultipleChoice ? (
          // Multiple choice question using checkboxes
          props.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-3 p-4 rounded-lg border ${
                isSubmitted && option.isCorrect ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" :
                isSubmitted && selected.includes(option.id) && !option.isCorrect ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" :
                ""
              }`}
            >
              <Checkbox
                id={option.id}
                checked={selected.includes(option.id)}
                onCheckedChange={() => handleSelect(option.id)}
                disabled={isSubmitted && isCorrect}
              />
              <label
                htmlFor={option.id}
                className="flex-grow cursor-pointer text-sm font-medium"
              >
                {option.text}
              </label>
            </div>
          ))
        ) : (
          // Single choice question using radio buttons
          <RadioGroup
            value={selected[0]}
            onValueChange={(value) => handleSelect(value)}
            disabled={isSubmitted && isCorrect}
          >
            {props.options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center space-x-3 p-4 rounded-lg border ${
                  isSubmitted && option.isCorrect ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" :
                  isSubmitted && selected.includes(option.id) && !option.isCorrect ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" :
                  ""
                }`}
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          className="flex-1"
          aria-label={isSubmitted && isCorrect ? "Proceed to next question" : "Submit your answer"}
        >
          {isSubmitted && isCorrect ? "Next Question" : "Submit Answer"}
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setShowAnswer(!showAnswer)}
          className="whitespace-nowrap"
        >
          {showAnswer ? "Hide Answer" : "Display Answer"}
        </Button>
      </div>

      {showAnswer && correctOptions.length > 0 && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-medium">Correct {correctOptions.length > 1 ? "Answers" : "Answer"}:</p>
          <ul className="mt-2 space-y-2">
            {correctOptions.map((answer) => (
              <li key={answer.id}>
                <p>{answer.text}</p>
                <p className="text-sm text-muted-foreground">{answer.explanation}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}