import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { StandardChallenge as StandardChallengeType } from "@/data/challengeTypes";

type StandardChallengeProps = StandardChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export function StandardChallenge(props: StandardChallengeProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const { toast } = useToast();

  const handleSelect = (optionId: string) => {
    setSelected(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      }
      return [...prev, optionId];
    });
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

    const correctOptions = props.options.filter(opt => opt.isCorrect);
    const selectedOptions = props.options.filter(opt => selected.includes(opt.id));
    
    const isAllCorrect = correctOptions.length === selectedOptions.length &&
      selectedOptions.every(opt => opt.isCorrect);
    
    if (!isAllCorrect) {
      setIsSubmitted(false);
      setSelected([]);
      toast({
        title: "Incorrect - Try Again",
        description: "Some of your selections were incorrect. Please try again.",
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

  const correctAnswers = props.options.filter(opt => opt.isCorrect);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {props.options.map((option) => (
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
        ))}
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

      {showAnswer && correctAnswers.length > 0 && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-medium">Correct Answers:</p>
          <ul className="mt-2 space-y-2">
            {correctAnswers.map((answer) => (
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