
import { cn } from "@/lib/utils";

type OptionType = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
};

type AnswerDisplayProps = {
  correctOptions: OptionType[];
};

export function AnswerDisplay({ correctOptions }: AnswerDisplayProps) {
  return (
    <div className="p-4 bg-muted rounded-lg space-y-4">
      <p className="font-medium">Correct Answer{correctOptions.length > 1 ? 's' : ''}:</p>
      {correctOptions.map((option, index) => (
        <div key={index} className="space-y-1">
          <p className="font-medium text-primary whitespace-pre-wrap break-words">{option.text}</p>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">{option.explanation}</p>
        </div>
      ))}
    </div>
  );
}
