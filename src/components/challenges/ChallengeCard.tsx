import { Challenge } from "@/data/challengeTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChallengeCardProps {
  challenge: Challenge;
  children: React.ReactNode;
}

export function ChallengeCard({ challenge, children }: ChallengeCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{challenge.title}</CardTitle>
        <p className="text-muted-foreground">{challenge.description}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}