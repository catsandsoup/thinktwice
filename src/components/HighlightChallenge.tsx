import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HighlightChallenge as HighlightChallengeType } from "@/data/challengeTypes";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface HighlightChallengeProps extends HighlightChallengeType {
  onComplete: (correct: boolean, xp: number) => void;
}

export function HighlightChallenge({ statement, highlights, xpReward, onComplete }: HighlightChallengeProps) {
  const [selectedSentences, setSelectedSentences] = useState<Set<number>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const { toast } = useToast();

  // Split the statement into sentences
  const sentences = statement
    .split(/(?<=[.!?])\s+/)
    .filter(sentence => sentence.trim().length > 0);

  const isSentenceCorrect = (sentence: string, index: number) => {
    return highlights.some(highlight => sentence.includes(highlight.text));
  };

  const getExplanationForSentence = (sentence: string) => {
    for (const highlight of highlights) {
      if (sentence.includes(highlight.text)) {
        return highlight.explanation;
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
      isSentenceCorrect(sentences[index], index)
    ) && highlights.every(highlight => 
      sentences.some((sentence, index) => 
        selectedSentences.has(index) && sentence.includes(highlight.text)
      )
    );

    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: "You've identified all the key sentences!",
      });
      onComplete(true, xpReward);
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
      <div className="flex flex-col gap-2">
        {sentences.map((sentence, index) => (
          <motion.button
            key={index}
            onClick={() => toggleSentence(index)}
            className={cn(
              "p-4 rounded-lg border text-left transition-all",
              "hover:bg-primary/5 active:bg-primary/10",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              selectedSentences.has(index) && "bg-primary/10 border-primary",
              showAnswer && isSentenceCorrect(sentence, index) && "bg-green-100 dark:bg-green-900/20 border-green-500",
              showAnswer && selectedSentences.has(index) && !isSentenceCorrect(sentence, index) && 
                "bg-red-100 dark:bg-red-900/20 border-red-500"
            )}
            initial={false}
            animate={{
              scale: selectedSentences.has(index) ? 1.02 : 1,
              backgroundColor: selectedSentences.has(index) ? "var(--primary-10)" : "transparent"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="text-base sm:text-lg leading-relaxed">{sentence}</p>
            {showAnswer && selectedSentences.has(index) && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-sm mt-2 text-muted-foreground"
              >
                {getExplanationForSentence(sentence)}
              </motion.p>
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-4">
        <Button 
          onClick={handleSubmit} 
          className="flex-1 h-12 text-base"
          size="lg"
        >
          Check Answers
        </Button>
        
        {wrongAttempts >= 3 && (
          <Button
            variant="outline"
            onClick={() => setShowAnswer(!showAnswer)}
            className="h-12 text-base"
            size="lg"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </Button>
        )}
      </div>
    </div>
  );
}