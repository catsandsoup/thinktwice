import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HighlightChallenge as HighlightChallengeType } from "@/data/challenges";
import { useToast } from "@/hooks/use-toast";

interface HighlightChallengeProps extends HighlightChallengeType {
  onComplete: (correct: boolean, xp: number) => void;
}

export function HighlightChallenge({ statement, highlights, xpReward, onComplete }: HighlightChallengeProps) {
  const [selectedText, setSelectedText] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleTextSelect = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString().trim();
    if (!text) return;

    const newSelected = new Set(selectedText);
    if (selectedText.has(text)) {
      newSelected.delete(text);
    } else {
      newSelected.add(text);
    }
    setSelectedText(newSelected);
    selection.removeAllRanges();
  };

  const handleSubmit = () => {
    const correctHighlights = new Set(highlights.map(h => h.text));
    const isCorrect = 
      selectedText.size === correctHighlights.size && 
      Array.from(selectedText).every(text => correctHighlights.has(text));

    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: "You've identified all the key statements correctly!",
      });
      onComplete(true, xpReward);
    } else {
      toast({
        title: "Try Again",
        description: "Some highlights are missing or incorrect.",
        variant: "destructive",
      });
      setSelectedText(new Set());
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="p-4 bg-muted rounded-lg whitespace-pre-wrap"
        onMouseUp={handleTextSelect}
      >
        {statement}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold">Selected Statements:</h3>
        {Array.from(selectedText).map((text, index) => (
          <div 
            key={index}
            className="p-2 bg-primary/10 rounded flex justify-between items-center"
          >
            <span>{text}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const newSelected = new Set(selectedText);
                newSelected.delete(text);
                setSelectedText(newSelected);
              }}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Submit Highlights
      </Button>
    </div>
  );
}