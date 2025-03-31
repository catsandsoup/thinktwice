
import { useState } from "react";
import { toast } from "sonner";

type OptionType = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
};

export function useStandardChallenge(
  options: OptionType[],
  onComplete: (correct: boolean, xp: number) => void,
  xpReward: number
) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctOptions = options.filter(opt => opt.isCorrect);
  const isMultipleChoice = correctOptions.length > 1;
  const hasSelection = selected.length > 0;

  const handleSelect = (optionId: string) => {
    if (isSubmitted) return;
    
    if (isMultipleChoice) {
      setSelected(prev => {
        if (prev.includes(optionId)) {
          return prev.filter(id => id !== optionId);
        }
        return [...prev, optionId];
      });
    } else {
      setSelected([optionId]);
    }
  };

  const handleSubmit = () => {
    if (selected.length === 0 && !isSubmitted) {
      toast.error("Please select an answer before submitting");
      return;
    }

    if (showNextQuestion) {
      onComplete(true, xpReward);
      setSelected([]);
      setIsSubmitted(false);
      setIsCorrect(false);
      setShowNextQuestion(false);
      setWrongAttempts(0);
      setShowAnswer(false);
      return;
    }

    const selectedOptions = options.filter(opt => selected.includes(opt.id));
    
    const isAllCorrect = isMultipleChoice
      ? correctOptions.length === selectedOptions.length &&
        selectedOptions.every(opt => opt.isCorrect)
      : selectedOptions.length === 1 && selectedOptions[0].isCorrect;
    
    setIsSubmitted(true);
    setIsCorrect(isAllCorrect);
    
    if (isAllCorrect) {
      setShowNextQuestion(true);
      setShowFeedback(true);
      setWrongAttempts(0);
    } else {
      setWrongAttempts(prev => prev + 1);
      toast.error("That's not quite right. Try again!");
    }
  };

  const handleRetry = () => {
    setSelected([]);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowNextQuestion(false);
    setShowAnswer(false);
  };

  const toggleShowAnswer = () => setShowAnswer(!showAnswer);

  const closeFeedback = () => setShowFeedback(false);

  return {
    selected,
    isSubmitted,
    isCorrect,
    showNextQuestion,
    wrongAttempts,
    showAnswer,
    showFeedback,
    correctOptions,
    isMultipleChoice,
    hasSelection,
    handleSelect,
    handleSubmit,
    handleRetry,
    toggleShowAnswer,
    closeFeedback
  };
}
