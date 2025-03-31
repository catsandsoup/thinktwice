
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type OptionType = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
};

type ChallengeOptionProps = {
  option: OptionType;
  isMultipleChoice: boolean;
  isSelected: boolean;
  isSubmitted: boolean;
  onSelect: (optionId: string) => void;
};

export function ChallengeOption({
  option,
  isMultipleChoice,
  isSelected,
  isSubmitted,
  onSelect
}: ChallengeOptionProps) {
  return (
    <div
      className={cn(
        "flex items-start space-x-3 p-4 rounded-lg border transition-colors",
        isSubmitted && option.isCorrect && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
        isSubmitted && isSelected && !option.isCorrect && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
      )}
    >
      <div className="flex items-center h-5">
        {isMultipleChoice ? (
          <Checkbox
            id={option.id}
            checked={isSelected}
            onCheckedChange={() => onSelect(option.id)}
            disabled={isSubmitted}
          />
        ) : (
          <RadioGroupItem value={option.id} id={option.id} />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <Label
          htmlFor={option.id}
          className="text-sm font-medium cursor-pointer whitespace-pre-wrap break-words"
        >
          {option.text}
        </Label>
        {isSubmitted && (isSelected || option.isCorrect) && (
          <p className={cn(
            "text-sm mt-1 whitespace-pre-wrap break-words",
            option.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            {option.explanation}
          </p>
        )}
      </div>
    </div>
  );
}
