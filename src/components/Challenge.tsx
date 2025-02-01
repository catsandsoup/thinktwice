import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Challenge as ChallengeType } from "@/data/challenges";
import { WordSelectionChallenge } from "./WordSelectionChallenge";
import { MatchingChallenge } from "./MatchingChallenge";
import { HighlightChallenge } from "./HighlightChallenge";

type ChallengeProps = ChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export function Challenge(props: ChallengeProps) {
  const renderChallenge = () => {
    switch (props.type) {
      case "word-selection":
        return <WordSelectionChallenge {...props} />;
      case "matching":
        return <MatchingChallenge {...props} />;
      case "highlight":
        return <HighlightChallenge {...props} />;
      default:
        return (
          <StandardChallenge {...props} />
        );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in" role="region" aria-label={`Question about ${props.type}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-2xl" id={`question-${props.title.toLowerCase().replace(/\s+/g, '-')}`}>
              {props.title}
            </CardTitle>
            <CardDescription className="text-base">
              {props.description}
            </CardDescription>
          </div>
          <Badge variant={
            props.difficulty === "beginner" ? "default" :
            props.difficulty === "intermediate" ? "secondary" : "outline"
          }>
            {props.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderChallenge()}
      </CardContent>
    </Card>
  );
}

function StandardChallenge(props: ChallengeProps) {
  const [selected, setSelected] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selected && !isSubmitted) {
      toast({
        title: "Selection Required",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (isSubmitted && isCorrect) {
      setSelected("");
      setIsSubmitted(false);
      setIsCorrect(false);
      props.onComplete(true, props.xpReward);
      return;
    }

    if ('options' in props) {
      const selectedOption = props.options.find(opt => opt.id === selected);
      const correct = selectedOption?.isCorrect || false;
      
      if (!correct) {
        setIsSubmitted(false);
        setSelected("");
      } else {
        setIsSubmitted(true);
        setIsCorrect(true);
      }

      toast({
        title: correct ? "Correct! 🎉" : "Incorrect - Try Again",
        description: selectedOption?.explanation,
        variant: correct ? "default" : "destructive",
      });
    }
  };

  return (
    <>
      {'options' in props && (
        <RadioGroup
          value={selected}
          onValueChange={setSelected}
          className="space-y-4"
          disabled={isSubmitted && isCorrect}
          aria-labelledby={`question-${props.title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {props.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-y-2 p-4 rounded-lg border ${
                isSubmitted && option.isCorrect ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" :
                isSubmitted && selected === option.id && !option.isCorrect ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" :
                ""
              }`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} aria-label={option.text} />
                <label
                  htmlFor={option.id}
                  className="flex-grow cursor-pointer text-sm font-medium"
                >
                  {option.text}
                </label>
              </div>
            </div>
          ))}
        </RadioGroup>
      )}

      <Button
        onClick={handleSubmit}
        className="w-full"
        aria-label={isSubmitted && isCorrect ? "Proceed to next question" : "Submit your answer"}
      >
        {isSubmitted && isCorrect ? "Next Question" : "Submit Answer"}
      </Button>
    </>
  );
}