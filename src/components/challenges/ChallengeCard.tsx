import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in" role="region" aria-label={`Question about ${challenge.type}`}>
      <CardHeader className="space-y-4">
        <div className={cn("p-4 rounded-lg", getBgColor())}>
          <Badge 
            variant={
              challenge.difficulty === "beginner" ? "default" :
              challenge.difficulty === "intermediate" ? "secondary" : "outline"
            }
            className="mb-2"
          >
            {challenge.difficulty}
          </Badge>
          <CardTitle className="text-xl sm:text-2xl mb-2" id={`question-${challenge.title.toLowerCase().replace(/\s+/g, '-')}`}>
            {challenge.title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {challenge.description}
          </CardDescription>
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