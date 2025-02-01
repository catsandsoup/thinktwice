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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selected && !isSubmitted) {
      toast({
        title: "Selection Required",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (isSubmitted && isCorrect) {
      setSelected("");
      setIsSubmitted(false);
      setIsCorrect(false);
      props.onComplete(true, props.xpReward);
      return;
    }

    const selectedOption = props.options.find(opt => opt.id === selected);
    const correct = selectedOption?.isCorrect || false;
    
    if (!correct) {
      setIsSubmitted(false);
      setSelected("");
    } else {
      setIsSubmitted(true);
      setIsCorrect(true);
    }

    toast({
      title: correct ? "Correct! 🎉" : "Incorrect - Try Again",
      description: selectedOption?.explanation,
      variant: correct ? "default" : "destructive",
    });
  };

  return (
    <>
      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="space-y-4"
        disabled={isSubmitted && isCorrect}
        aria-labelledby={`question-${props.title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {props.options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center space-y-2 p-4 rounded-lg border ${
              isSubmitted && option.isCorrect ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" :
              isSubmitted && selected === option.id && !option.isCorrect ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" :
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

      <Button
        onClick={handleSubmit}
        className="w-full"
        aria-label={isSubmitted && isCorrect ? "Proceed to next question" : "Submit your answer"}
      >
        {isSubmitted && isCorrect ? "Next Question" : "Submit Answer"}
      </Button>
    </>
  );
}