import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HighlightChallenge as HighlightChallengeType } from "@/data/challengeTypes";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface HighlightChallengeProps extends HighlightChallengeType {
  onComplete: (correct: boolean, xp: number) => void;
}

export function HighlightChallenge({ statement, highlights, xpReward, onComplete }: HighlightChallengeProps) {
  const [selectedText, setSelectedText] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    // Disable default text selection on mobile
    const textContainer = document.querySelector('.highlight-text-container');
    if (textContainer && isMobile) {
      textContainer.addEventListener('selectstart', (e) => e.preventDefault());
    }
  }, [isMobile]);

  const handleTextSelect = () => {
    if (isMobile) return; // Skip for mobile devices
    
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString().trim();
    if (!text) return;

    addSelectedText(text);
    selection.removeAllRanges();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchStart - touchEnd) < 50) return; // Ignore small movements

    const textContainer = document.querySelector('.highlight-text-container');
    if (!textContainer) return;

    const range = document.createRange();
    const selection = window.getSelection();
    
    // Calculate the selection based on touch positions
    const startOffset = Math.min(
      Math.floor((Math.min(touchStart, touchEnd) / textContainer.clientWidth) * statement.length),
      statement.length
    );
    const endOffset = Math.min(
      Math.floor((Math.max(touchStart, touchEnd) / textContainer.clientWidth) * statement.length),
      statement.length
    );

    try {
      if (textContainer.firstChild) {
        range.setStart(textContainer.firstChild, startOffset);
        range.setEnd(textContainer.firstChild, endOffset);
        
        const text = range.toString().trim();
        if (text) {
          addSelectedText(text);
        }
      }
    } catch (error) {
      console.error('Error setting range:', error);
    }
  };

  const addSelectedText = (text: string) => {
    const newSelected = new Set(selectedText);
    if (selectedText.has(text)) {
      newSelected.delete(text);
    } else {
      newSelected.add(text);
    }
    setSelectedText(newSelected);
  };

  const isTextCloseEnough = (selected: string, correct: string) => {
    const selectedPos = statement.indexOf(selected);
    const correctPos = statement.indexOf(correct);
    const margin = 20;
    return Math.abs(selectedPos - correctPos) <= margin;
  };

  const handleSubmit = () => {
    const correctHighlights = new Set(highlights.map(h => h.text));
    
    const isCorrect = Array.from(selectedText).some(selected => 
      Array.from(correctHighlights).some(correct => 
        selected.includes(correct) || 
        correct.includes(selected) ||
        isTextCloseEnough(selected, correct)
      )
    );

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
      setSelectedText(new Set());
      setWrongAttempts(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="highlight-text-container p-4 bg-muted rounded-lg whitespace-pre-wrap select-none"
        onMouseUp={handleTextSelect}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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

      <div className="flex gap-2">
        <Button onClick={handleSubmit} className="flex-1">
          Submit Highlights
        </Button>
        
        {wrongAttempts >= 3 && (
          <Button
            variant="outline"
            onClick={() => setShowAnswer(!showAnswer)}
            className="whitespace-nowrap"
          >
            {showAnswer ? "Hide Answer" : "Display Answer"}
          </Button>
        )}
      </div>

      {showAnswer && (
        <div className="p-4 bg-muted rounded-lg space-y-4">
          <p className="font-medium">Correct Highlights:</p>
          {highlights.map((highlight, index) => (
            <div key={index} className="space-y-1">
              <p className="font-medium text-primary">{highlight.text}</p>
              <p className="text-sm text-muted-foreground">{highlight.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}