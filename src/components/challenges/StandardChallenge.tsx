import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { StandardChallenge as StandardChallengeType } from "@/data/challengeTypes";

type StandardChallengeProps = StandardChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export function StandardChallenge(props: StandardChallengeProps) {
  const [selected, setSelected] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selected) {
      toast({
        title: "Selection Required",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    const selectedOption = props.options.find(opt => opt.id === selected);
    const correct = selectedOption?.isCorrect || false;
    
    toast({
      title: correct ? "Correct! 🎉" : "Incorrect - Try Again",
      description: selectedOption?.explanation,
      variant: correct ? "default" : "destructive",
    });

    if (correct) {
      props.onComplete(true, props.xpReward);
    } else {
      setSelected("");
    }
  };

  const correctAnswer = props.options.find(opt => opt.isCorrect);

  return (
    <div className="space-y-4">
      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="space-y-4"
        aria-labelledby={`question-${props.title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {props.options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center space-y-2 p-4 rounded-lg border ${
              selected === option.id && option.isCorrect ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" :
              selected === option.id && !option.isCorrect ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" :
              ""
            }`}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} aria-label={option.text} />
              <label
                htmlFor={option.id}
                className="flex-grow cursor-pointer text-sm font-medium"
              >
                {option.text}
              </label>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          className="flex-1"
          aria-label="Submit your answer"
        >
          Submit Answer
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setShowAnswer(!showAnswer)}
          className="whitespace-nowrap"
        >
          {showAnswer ? "Hide Answer" : "Display Answer"}
        </Button>
      </div>

      {showAnswer && correctAnswer && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-medium">Correct Answer:</p>
          <p>{correctAnswer.text}</p>
          <p className="mt-2 text-sm text-muted-foreground">{correctAnswer.explanation}</p>
        </div>
      )}
    </div>
  );
}