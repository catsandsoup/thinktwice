
import { RadioGroup } from "@/components/ui/radio-group";
import { ChallengeOption } from "./ChallengeOption";

type OptionType = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
};

type ChallengeOptionsProps = {
  options: OptionType[];
  isMultipleChoice: boolean;
  isSubmitted: boolean;
  selected: string[];
  onSelect: (optionId: string) => void;
};

export function ChallengeOptions({
  options,
  isMultipleChoice,
  isSubmitted,
  selected,
  onSelect
}: ChallengeOptionsProps) {
  if (isMultipleChoice) {
    return (
      <div className="space-y-4">
        {options.map((option) => (
          <ChallengeOption
            key={option.id}
            option={option}
            isMultipleChoice={true}
            isSelected={selected.includes(option.id)}
            isSubmitted={isSubmitted}
            onSelect={onSelect}
          />
        ))}
      </div>
    );
  }

  return (
    <RadioGroup
      value={selected[0]}
      onValueChange={(value) => onSelect(value)}
      disabled={isSubmitted}
      className="space-y-4"
    >
      {options.map((option) => (
        <ChallengeOption
          key={option.id}
          option={option}
          isMultipleChoice={false}
          isSelected={selected.includes(option.id)}
          isSubmitted={isSubmitted}
          onSelect={onSelect}
        />
      ))}
    </RadioGroup>
  );
}
