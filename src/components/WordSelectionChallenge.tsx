import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WordSelectionChallenge as WordSelectionChallengeType } from "@/data/challengeTypes";
import { cn } from "@/lib/utils";

type WordSelectionChallengeProps = WordSelectionChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export function WordSelectionChallenge(props: WordSelectionChallengeProps) {
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleWordClick = (word: string) => {
    if (isSubmitted) return;

    const newSelectedWords = new Set(selectedWords);
    if (selectedWords.has(word)) {
      newSelectedWords.delete(word);
    } else {
      newSelectedWords.add(word);
    }
    setSelectedWords(newSelectedWords);
  };

  const handleSubmit = () => {
    if (selectedWords.size === 0 && !isSubmitted) {
      return;
    }

    if (showNextQuestion) {
      props.onComplete(true, props.xpReward);
      setSelectedWords(new Set());
      setIsSubmitted(false);
      setIsCorrect(false);
      setShowNextQuestion(false);
      setWrongAttempts(0);
      setShowAnswer(false);
      return;
    }

    const correctWords = new Set(props.keyWords.map(kw => kw.word));
    const isAllCorrect = 
      selectedWords.size === correctWords.size &&
      Array.from(selectedWords).every(word => correctWords.has(word));

    setIsSubmitted(true);
    setIsCorrect(isAllCorrect);
    
    if (isAllCorrect) {
      setShowNextQuestion(true);
      setWrongAttempts(0);
      setShowAnswer(false);
    } else {
      setWrongAttempts(prev => prev + 1);
    }
  };

  const handleRetry = () => {
    setSelectedWords(new Set());
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowNextQuestion(false);
    setShowAnswer(false);
  };

  const renderText = () => {
    const words = props.passage.split(/\s+/);
    return words.map((word, index) => {
      const keywordPhrase = props.keyWords.find(kw => {
        const phraseWords = kw.word.split(/\s+/);
        const remainingWords = words.slice(index, index + phraseWords.length);
        return phraseWords.length <= remainingWords.length && 
               phraseWords.join(' ') === remainingWords.join(' ');
      });

      if (keywordPhrase) {
        const phraseWords = keywordPhrase.word.split(/\s+/);
        const phrase = words.slice(index, index + phraseWords.length).join(' ');
        const isSelected = selectedWords.has(phrase);
        const isCorrectWord = isSubmitted && props.keyWords.some(kw => kw.word === phrase);

        for (let i = 1; i < phraseWords.length; i++) {
          words[index + i] = '';
        }

        return (
          <span
            key={index}
            onClick={() => handleWordClick(phrase)}
            className={cn(
              "cursor-pointer px-0.5 rounded transition-colors",
              isSelected && "bg-blue-200 dark:bg-blue-800",
              isSubmitted && isCorrectWord && "bg-green-200 dark:bg-green-800",
              isSubmitted && isSelected && !isCorrectWord && "bg-red-200 dark:bg-red-800"
            )}
          >
            {phrase}
            {isSubmitted && (isSelected || isCorrectWord) && (
              <div className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                {props.keyWords.find(kw => kw.word === phrase)?.explanation}
              </div>
            )}
          </span>
        );
      }

      return word ? (
        <span key={index} className="px-0.5">
          {word}
        </span>
      ) : null;
    });
  };

  return (
    <div className="space-y-4">
      <div className="prose dark:prose-invert max-w-none">
        <div className="p-4 bg-muted rounded-lg space-y-2">
          {renderText()}
        </div>
      </div>

      <div className="flex gap-2">
        {isSubmitted && !isCorrect ? (
          <Button
            onClick={handleRetry}
            className="flex-1"
            variant="secondary"
          >
            Try Again
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="flex-1"
            aria-label={showNextQuestion ? "Proceed to next question" : "Submit your answer"}
          >
            {showNextQuestion ? "Next Question" : "Submit Answer"}
          </Button>
        )}

        {wrongAttempts >= 3 && !showNextQuestion && (
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
          <p className="font-medium">Correct Words:</p>
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
