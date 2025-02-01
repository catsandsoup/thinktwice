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

    const selectedOption = options.find(opt => opt.id === selected);
    const isCorrect = selectedOption?.isCorrect || false;

    setIsSubmitted(true);
    onComplete(isCorrect, isCorrect ? xpReward : 0);

    toast({
      title: isCorrect ? "Correct! 🎉" : "Not quite right",
      description: selectedOption?.explanation,
      variant: isCorrect ? "default" : "destructive",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
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
          disabled={isSubmitted}
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-2 p-4 rounded-lg border ${
                isSubmitted && option.isCorrect ? "bg-green-50 border-green-200" :
                isSubmitted && selected === option.id && !option.isCorrect ? "bg-red-50 border-red-200" :
                "hover:bg-accent"
              }`}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <label
                htmlFor={option.id}
                className="flex-grow cursor-pointer text-sm"
              >
                {option.text}
              </label>
            </div>
          ))}
        </RadioGroup>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitted}
          className="w-full"
        >
          Submit Answer
        </Button>
      </CardContent>
    </Card>
  );
}