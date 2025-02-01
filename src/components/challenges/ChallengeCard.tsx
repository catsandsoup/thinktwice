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
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-2xl" id={`question-${challenge.title.toLowerCase().replace(/\s+/g, '-')}`}>
              {challenge.title}
            </CardTitle>
            <CardDescription className="text-base">
              {challenge.description}
            </CardDescription>
          </div>
          <Badge variant={
            challenge.difficulty === "beginner" ? "default" :
            challenge.difficulty === "intermediate" ? "secondary" : "outline"
          }>
            {challenge.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
}