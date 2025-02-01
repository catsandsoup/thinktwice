import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WordSelectionChallenge as WordSelectionChallengeType } from "@/data/challenges";
import { useToast } from "@/hooks/use-toast";

interface WordSelectionChallengeProps extends WordSelectionChallengeType {
  onComplete: (correct: boolean, xp: number) => void;
}

export function WordSelectionChallenge({ passage, keyWords, xpReward, onComplete }: WordSelectionChallengeProps) {
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const { toast } = useToast();

  const handleWordClick = (word: string) => {
    const newSelected = new Set(selectedWords);
    if (selectedWords.has(word)) {
      newSelected.delete(word);
    } else {
      newSelected.add(word);
    }
    setSelectedWords(newSelected);
  };

  const handleSubmit = () => {
    const correctWords = new Set(keyWords.map(kw => kw.word));
    const isCorrect = 
      selectedWords.size === correctWords.size && 
      Array.from(selectedWords).every(word => correctWords.has(word));

    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: "You've identified all the key words correctly!",
      });
      onComplete(true, xpReward);
    } else {
      toast({
        title: "Try Again",
        description: "Some words are missing or incorrectly selected.",
        variant: "destructive",
      });
      setSelectedWords(new Set());
    }
  };

  const words = passage.split(/\s+/);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        {words.map((word, index) => (
          <span
            key={index}
            onClick={() => handleWordClick(word)}
            className={`inline-block mx-1 cursor-pointer ${
              selectedWords.has(word)
                ? "bg-primary text-primary-foreground px-1 rounded"
                : "hover:bg-accent hover:text-accent-foreground px-1 rounded"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Button onClick={handleSubmit} className="flex-1">
          Submit Selection
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setShowAnswer(!showAnswer)}
          className="whitespace-nowrap"
        >
          {showAnswer ? "Hide Answer" : "Display Answer"}
        </Button>
      </div>

      {showAnswer && (
        <div className="p-4 bg-muted rounded-lg space-y-2">
          <p className="font-medium">Key Words:</p>
          {keyWords.map((kw, index) => (
            <div key={index} className="space-y-1">
              <p className="font-medium text-primary">{kw.word}</p>
              <p className="text-sm text-muted-foreground">{kw.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}