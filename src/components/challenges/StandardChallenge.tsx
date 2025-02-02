import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { StandardChallenge as StandardChallengeType } from "@/data/challengeTypes";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type StandardChallengeProps = StandardChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export function StandardChallenge(props: StandardChallengeProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const correctOptions = props.options.filter(opt => opt.isCorrect);
  const isMultipleChoice = correctOptions.length > 1;

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
      props.onComplete(true, props.xpReward);
      setSelected([]);
      setIsSubmitted(false);
      setIsCorrect(false);
      setShowNextQuestion(false);
      setWrongAttempts(0);
      setShowAnswer(false);
      return;
    }

    const selectedOptions = props.options.filter(opt => selected.includes(opt.id));
    
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

  const handleFeedbackSubmit = async () => {
    try {
      const { error } = await supabase
        .from('challenge_feedback')
        .insert({
          challenge_id: props.id,
          rating,
          feedback_text: feedbackText
        });

      if (error) throw error;

      toast.success("Thank you for your feedback!");
      setShowFeedback(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      {isMultipleChoice && !isSubmitted && (
        <p className="text-sm text-muted-foreground italic">
          Select all answers that apply
        </p>
      )}

      <div className="space-y-4">
        {isMultipleChoice ? (
          props.options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "flex items-start space-x-3 p-4 rounded-lg border transition-colors",
                isSubmitted && option.isCorrect && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
                isSubmitted && selected.includes(option.id) && !option.isCorrect && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
              )}
            >
              <div className="flex items-center h-5">
                <Checkbox
                  id={option.id}
                  checked={selected.includes(option.id)}
                  onCheckedChange={() => handleSelect(option.id)}
                  disabled={isSubmitted}
                />
              </div>
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor={option.id}
                  className="text-sm font-medium cursor-pointer whitespace-pre-wrap break-words"
                >
                  {option.text}
                </Label>
                {isSubmitted && (selected.includes(option.id) || option.isCorrect) && (
                  <p className={cn(
                    "text-sm mt-1 whitespace-pre-wrap break-words",
                    option.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {option.explanation}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <RadioGroup
            value={selected[0]}
            onValueChange={(value) => handleSelect(value)}
            disabled={isSubmitted}
            className="space-y-4"
          >
            {props.options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex items-start space-x-3 p-4 rounded-lg border transition-colors",
                  isSubmitted && option.isCorrect && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
                  isSubmitted && selected.includes(option.id) && !option.isCorrect && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                )}
              >
                <div className="flex items-center h-5">
                  <RadioGroupItem value={option.id} id={option.id} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor={option.id}
                    className="text-sm font-medium cursor-pointer whitespace-pre-wrap break-words"
                  >
                    {option.text}
                  </Label>
                  {isSubmitted && (selected.includes(option.id) || option.isCorrect) && (
                    <p className={cn(
                      "text-sm mt-1 whitespace-pre-wrap break-words",
                      option.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {option.explanation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </RadioGroup>
        )}
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
          <p className="font-medium">Correct Answer{correctOptions.length > 1 ? 's' : ''}:</p>
          {props.options.filter(opt => opt.isCorrect).map((option, index) => (
            <div key={index} className="space-y-1">
              <p className="font-medium text-primary whitespace-pre-wrap break-words">{option.text}</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">{option.explanation}</p>
            </div>
          ))}
        </div>
      )}

      {showFeedback && (
        <div className="p-4 bg-muted rounded-lg space-y-4">
          <h3 className="font-medium">How was this challenge?</h3>
          
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={cn(
                  "p-1 rounded hover:bg-accent",
                  rating >= star ? "text-yellow-500" : "text-gray-300"
                )}
              >
                <Star className="h-6 w-6" fill={rating >= star ? "currentColor" : "none"} />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Share your thoughts about this challenge (optional)"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="min-h-[100px]"
          />

          <div className="flex gap-2">
            <Button onClick={handleFeedbackSubmit} disabled={rating === 0}>
              Submit Feedback
            </Button>
            <Button variant="outline" onClick={() => setShowFeedback(false)}>
              Skip
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}