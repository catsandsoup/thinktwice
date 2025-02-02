import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HighlightChallenge as HighlightChallengeType } from "@/data/challengeTypes";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface HighlightChallengeProps extends HighlightChallengeType {
  onComplete: (correct: boolean, xp: number) => void;
}

export function HighlightChallenge({ statement, highlights, xpReward, onComplete }: HighlightChallengeProps) {
  const [selectedSegments, setSelectedSegments] = useState<Set<number>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const { toast } = useToast();

  // Split the statement into segments while preserving spaces
  const segments = statement.split(/(\s+)/).filter(segment => segment.trim().length > 0);

  const isSegmentCorrect = (segment: string, index: number) => {
    return highlights.some(highlight => {
      const highlightWords = highlight.text.split(/\s+/);
      const segmentWords = segments.slice(index, index + highlightWords.length)
        .filter(s => s.trim().length > 0)
        .join(' ');
      return segmentWords === highlight.text;
    });
  };

  const getExplanationForSegment = (segment: string, index: number) => {
    for (const highlight of highlights) {
      const highlightWords = highlight.text.split(/\s+/);
      const segmentWords = segments.slice(index, index + highlightWords.length)
        .filter(s => s.trim().length > 0)
        .join(' ');
      if (segmentWords === highlight.text) {
        return highlight.explanation;
      }
    }
    return null;
  };

  const toggleSegment = (index: number) => {
    const newSelected = new Set(selectedSegments);
    if (selectedSegments.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedSegments(newSelected);
  };

  const handleSubmit = () => {
    if (selectedSegments.size === 0) {
      toast({
        title: "No Selection",
        description: "Please select at least one segment before submitting.",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = Array.from(selectedSegments).every(index => 
      isSegmentCorrect(segments[index], index)
    ) && highlights.every(highlight => {
      const words = highlight.text.split(/\s+/);
      return segments.some((segment, index) => {
        if (!selectedSegments.has(index)) return false;
        const segmentWords = segments.slice(index, index + words.length)
          .filter(s => s.trim().length > 0)
          .join(' ');
        return segmentWords === highlight.text;
      });
    });

    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: "You've identified the key statements correctly!",
      });
      onComplete(true, xpReward);
      setWrongAttempts(0);
    } else {
      toast({
        title: "Try Again",
        description: "Some highlights are missing or incorrect.",
        variant: "destructive",
      });
      setSelectedSegments(new Set());
      setWrongAttempts(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex flex-wrap gap-2">
          {segments.map((segment, index) => (
            <button
              key={index}
              onClick={() => toggleSegment(index)}
              className={cn(
                "px-2 py-1.5 rounded transition-colors text-left min-h-[2.5rem]",
                "hover:bg-primary/10 active:bg-primary/5",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                "text-base sm:text-lg leading-normal",
                "touch-manipulation",
                selectedSegments.has(index) ? "bg-primary/20" : "bg-transparent",
                showAnswer && isSegmentCorrect(segment, index) && "bg-green-200 dark:bg-green-800"
              )}
            >
              {segment}
            </button>
          ))}
        </div>
      </div>

      {showAnswer && (
        <div className="space-y-2">
          {highlights.map((highlight, index) => (
            <div key={index} className="p-3 bg-muted rounded">
              <p className="font-medium text-primary">{highlight.text}</p>
              <p className="text-sm text-muted-foreground mt-1">{highlight.explanation}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          onClick={handleSubmit} 
          className="flex-1 h-12 text-base"
        >
          Submit Highlights
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
    </div>
  );
}