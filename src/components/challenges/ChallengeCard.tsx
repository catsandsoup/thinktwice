import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Challenge } from "@/data/challengeTypes";

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
      <CardHeader className="space-y-3 px-4 py-3">
        <div className={`p-3 rounded-lg w-full ${getBgColor()}`}>
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
      </CardHeader>
      
      <CardContent className="space-y-4 px-4 py-3">
        {children}
        <div className="flex items-center justify-center text-sm text-gray-600">
          <span>Complete this mission to earn {challenge.xpReward} detective stars!</span>
        </div>
      </CardContent>
    </Card>
  );
}