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
  const [touchStart, setTouchStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    // Disable default text selection behavior on mobile
    if (isMobile) {
      document.body.style.webkitUserSelect = 'none';
      document.body.style.userSelect = 'none';
      return () => {
        document.body.style.webkitUserSelect = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isMobile]);

  const handleTextSelect = () => {
    if (isMobile) return;
    
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString().trim();
    if (!text) return;

    addSelectedText(text);
    selection.removeAllRanges();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while selecting
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    
    // Calculate distance moved
    const deltaX = Math.abs(touchEnd.x - touchStart.x);
    const deltaY = Math.abs(touchEnd.y - touchStart.y);
    
    // If movement was too small or mostly vertical, ignore it
    if (deltaX < 20 || deltaY > deltaX) return;

    const textContainer = e.currentTarget;
    const range = document.createRange();
    const textNode = Array.from(textContainer.childNodes).find(node => 
      node.nodeType === Node.TEXT_NODE
    );

    if (!textNode) return;

    // Calculate relative positions within the text container
    const rect = textContainer.getBoundingClientRect();
    const startX = (touchStart.x - rect.left) / rect.width;
    const endX = (touchEnd.x - rect.left) / rect.width;

    // Map touch positions to text positions
    const startOffset = Math.max(0, Math.min(
      Math.floor(startX * statement.length),
      statement.length
    ));
    const endOffset = Math.max(0, Math.min(
      Math.floor(endX * statement.length),
      statement.length
    ));

    try {
      // Set the range based on whether the user dragged left or right
      if (startX <= endX) {
        range.setStart(textNode, startOffset);
        range.setEnd(textNode, endOffset);
      } else {
        range.setStart(textNode, endOffset);
        range.setEnd(textNode, startOffset);
      }

      const selectedText = range.toString().trim();
      if (selectedText) {
        addSelectedText(selectedText);
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
    const margin = Math.min(selected.length, correct.length) / 2;
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
        className="highlight-text-container p-4 bg-muted rounded-lg whitespace-pre-wrap text-base leading-relaxed"
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
            <span className="text-sm flex-1 mr-2">{text}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const newSelected = new Set(selectedText);
                newSelected.delete(text);
                setSelectedText(newSelected);
              }}
              className="shrink-0"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
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
            className="whitespace-nowrap h-12"
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