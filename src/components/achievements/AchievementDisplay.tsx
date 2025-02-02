import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

interface AchievementDisplayProps {
  name: string;
  description: string;
  earnedAt: string;
}

export function AchievementDisplay({ name, description, earnedAt }: AchievementDisplayProps) {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
      <Award className="w-8 h-8 mb-2 text-primary" />
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Badge variant="secondary" className="mt-2">
        {new Date(earnedAt).toLocaleDateString()}
      </Badge>
    </div>
  );
}