import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LightbulbIcon } from "lucide-react";
import { Challenge } from "@/data/challengeTypes";
import { cn } from "@/lib/utils";

type ChallengeCardProps = {
  challenge: Challenge;
  children: React.ReactNode;
};

export function ChallengeCard({ challenge, children }: ChallengeCardProps) {
  const getBgColor = () => {
    switch (challenge.type) {
      case "word-selection":
        return "bg-purple-50";
      case "matching":
        return "bg-blue-50";
      case "highlight":
        return "bg-green-50";
      default:
        return "bg-gray-50";
    }
  };

  const getHints = () => {
    const hints = [];
    
    switch (challenge.type) {
      case "word-selection":
        hints.push(
          "Look for emotionally charged words",
          "Identify words that make claims stronger or weaker",
          "Find words that might influence your opinion"
        );
        break;
      
      case "matching":
        hints.push(
          "Compare the evidence with each claim carefully",
          "Look for direct connections between statements",
          "Consider how well the evidence supports each claim"
        );
        break;
      
      case "highlight":
        hints.push(
          "Focus on key statements that make important claims",
          "Look for phrases that contain main arguments",
          "Identify parts that could be supported by evidence"
        );
        break;
      
      default:
        if (challenge.title.toLowerCase().includes("fallacy")) {
          hints.push(
            "Look for common reasoning mistakes",
            "Check if conclusions follow logically",
            "Consider if there are hidden assumptions"
          );
        } else if (challenge.title.toLowerCase().includes("source")) {
          hints.push(
            "Consider the source's expertise",
            "Look for potential biases",
            "Check for credibility indicators"
          );
        } else if (challenge.title.toLowerCase().includes("media")) {
          hints.push(
            "Analyze how information is presented",
            "Look for emotional appeals",
            "Consider different perspectives"
          );
        } else {
          hints.push(
            "Check for accuracy in the statements",
            "Look for supporting evidence",
            "Consider alternative explanations"
          );
        }
    }

    return hints;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in" role="region" aria-label={`Question about ${challenge.type}`}>
      <CardHeader className="space-y-4">
        <div className={cn("p-4 rounded-lg", getBgColor())}>
          <div className="flex justify-center mb-2">
            <Badge 
              variant={
                challenge.difficulty === "beginner" ? "default" :
                challenge.difficulty === "intermediate" ? "secondary" : "outline"
              }
            >
              {challenge.difficulty}
            </Badge>
          </div>
          <CardTitle className="text-xl sm:text-2xl mb-2" id={`question-${challenge.title.toLowerCase().replace(/\s+/g, '-')}`}>
            {challenge.title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {challenge.description}
          </CardDescription>
        </div>
        
        <div className="flex items-start space-x-3 bg-yellow-50 p-4 rounded-lg w-full">
          <LightbulbIcon className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <div className="space-y-2 text-sm text-gray-600 w-full">
            <p>What to Look For:</p>
            <ul className="list-disc list-inside space-y-1">
              {getHints().map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {children}
        <div className="flex items-center justify-center text-sm text-gray-600">
          <span>Complete this mission to earn {challenge.xpReward} detective stars!</span>
        </div>
      </CardContent>
    </Card>
  );
}