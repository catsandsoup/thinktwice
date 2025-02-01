import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ChallengeProps {
  title: string;
  description: string;
  type: "headline" | "fallacy" | "media" | "source";
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  difficulty: "beginner" | "intermediate" | "advanced";
  xpReward: number;
  onComplete: (correct: boolean, xp: number) => void;
}

export function Challenge({ 
  title, 
  description, 
  type, 
  options, 
  difficulty, 
  xpReward, 
  onComplete 
}: ChallengeProps) {
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
      onComplete(true, xpReward);
      return;
    }

    const selectedOption = options.find(opt => opt.id === selected);
    const correct = selectedOption?.isCorrect || false;
    
    if (!correct) {
      // Reset the submission state to allow retrying
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
    <Card className="w-full max-w-2xl mx-auto animate-fade-in" role="region" aria-label={`Question about ${type}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-2xl" id={`question-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {title}
            </CardTitle>
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </div>
          <Badge variant={
            difficulty === "beginner" ? "default" :
            difficulty === "intermediate" ? "secondary" : "outline"
          }>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selected}
          onValueChange={setSelected}
          className="space-y-4"
          disabled={isSubmitted && isCorrect}
          aria-labelledby={`question-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-y-2 p-4 rounded-lg border ${
                isSubmitted && option.isCorrect ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" :
                isSubmitted && selected === option.id && !option.isCorrect ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" :
                "hover:bg-accent"
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
      </CardContent>
    </Card>
  );
}