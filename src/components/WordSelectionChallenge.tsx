import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WordSelectionChallenge as WordSelectionChallengeType } from "@/data/challengeTypes";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type WordSelectionChallengeProps = WordSelectionChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export function WordSelectionChallenge(props: WordSelectionChallengeProps) {
  const [selectedSentences, setSelectedSentences] = useState<Set<number>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const { toast } = useToast();

  // Split the passage into sentences
  const sentences = props.passage
    .split(/(?<=[.!?])\s+/)
    .filter(sentence => sentence.trim().length > 0);

  const isKeywordInSentence = (sentence: string, index: number) => {
    return props.keyWords.some(kw => sentence.includes(kw.word));
  };

  const getExplanationForSentence = (sentence: string) => {
    for (const keyword of props.keyWords) {
      if (sentence.includes(keyword.word)) {
        return keyword.explanation;
      }
    }
    return null;
  };

  const toggleSentence = (index: number) => {
    const newSelected = new Set(selectedSentences);
    if (selectedSentences.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedSentences(newSelected);
  };

  const handleSubmit = () => {
    if (selectedSentences.size === 0) {
      toast({
        title: "No Selection",
        description: "Please select at least one sentence before submitting.",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = Array.from(selectedSentences).every(index => 
      isKeywordInSentence(sentences[index], index)
    ) && props.keyWords.every(keyword => 
      sentences.some((sentence, index) => 
        selectedSentences.has(index) && sentence.includes(keyword.word)
      )
    );

    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: "You've identified all the key sentences!",
      });
      onComplete(true, props.xpReward);
      setWrongAttempts(0);
    } else {
      toast({
        title: "Try Again",
        description: "Some selections are missing or incorrect.",
        variant: "destructive",
      });
      setSelectedSentences(new Set());
      setWrongAttempts(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex flex-col gap-2">
          {sentences.map((sentence, index) => (
            <button
              key={index}
              onClick={() => toggleSentence(index)}
              className={cn(
                "px-3 py-2 rounded transition-colors text-left",
                "hover:bg-primary/10 active:bg-primary/5",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                "text-base sm:text-lg leading-normal",
                "touch-manipulation",
                selectedSentences.has(index) ? "bg-primary/20" : "bg-transparent",
                showAnswer && isKeywordInSentence(sentence, index) && "bg-green-200 dark:bg-green-800"
              )}
            >
              {sentence}
              {showAnswer && isKeywordInSentence(sentence, index) && (
                <div className="text-sm mt-1 text-muted-foreground">
                  {getExplanationForSentence(sentence)}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          onClick={handleSubmit} 
          className="flex-1 h-12 text-base"
        >
          Submit Selection
        </Button>
        
        {wrongAttempts >= 3 && (
          <Button
            variant="outline"
            onClick={() => setShowAnswer(!showAnswer)}
            className="h-12 text-base"
          >
            {showAnswer ? "Hide Answer" : "Display Answer"}
          </Button>
        )}
      </div>

      {showAnswer && (
        <div className="p-4 bg-muted rounded-lg space-y-4">
          <p className="font-medium">Key Sentences:</p>
          {props.keyWords.map((kw, index) => (
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