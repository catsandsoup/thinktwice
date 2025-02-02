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
        return "bg-purple-50/50";
      case "matching":
        return "bg-blue-50/50";
      case "highlight":
        return "bg-green-50/50";
      default:
        return "bg-gray-50/50";
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in shadow-sm" role="region" aria-label={`Question about ${challenge.type}`}>
      <CardHeader className="space-y-4 px-4 py-3">
        <div className={cn("rounded-lg space-y-2", getBgColor())}>
          <div className="flex items-start gap-2">
            <Badge 
              variant={
                challenge.difficulty === "beginner" ? "default" :
                challenge.difficulty === "intermediate" ? "secondary" : "outline"
              }
              className="mt-1"
            >
              {challenge.difficulty}
            </Badge>
            <div className="space-y-1 text-left">
              <CardTitle className="text-lg font-medium" id={`question-${challenge.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {challenge.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {challenge.description}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pb-4 space-y-4">
        {children}
        <div className="text-xs text-gray-500 text-center">
          Complete this challenge to earn {challenge.xpReward} detective stars
        </div>
      </CardContent>
    </Card>
  );
}