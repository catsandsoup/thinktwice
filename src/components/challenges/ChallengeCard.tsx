import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Challenge } from "@/data/challengeTypes";

type ChallengeCardProps = {
  challenge: Challenge;
  children: React.ReactNode;
};

export function ChallengeCard({ challenge, children }: ChallengeCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in" role="region" aria-label={`Question about ${challenge.type}`}>
      <CardHeader className="text-center space-y-4">
        <Badge 
          variant={
            challenge.difficulty === "beginner" ? "default" :
            challenge.difficulty === "intermediate" ? "secondary" : "outline"
          }
          className="w-fit mx-auto"
        >
          {challenge.difficulty}
        </Badge>
        <div className="space-y-2">
          <CardTitle className="text-xl sm:text-2xl" id={`question-${challenge.title.toLowerCase().replace(/\s+/g, '-')}`}>
            {challenge.title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base max-w-prose mx-auto">
            {challenge.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}