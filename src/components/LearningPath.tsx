import { Card } from "@/components/ui/card";
import { Brain, Trophy, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface LearningPathProps {
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  onClick: () => void;
  progress?: number;
}

export function LearningPath({ 
  title, 
  description, 
  level,
  onClick,
  progress = 0
}: LearningPathProps) {
  const Icon = {
    beginner: Brain,
    intermediate: Trophy,
    advanced: GraduationCap,
  }[level];

  const bgColor = {
    beginner: "from-blue-500 to-blue-700",
    intermediate: "from-purple-500 to-purple-700",
    advanced: "from-orange-500 to-orange-700",
  }[level];

  return (
    <Card
      onClick={onClick}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br cursor-pointer transition-transform hover:scale-[1.02]",
        bgColor
      )}
    >
      <div className="p-6 text-white space-y-4">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Icon className="w-8 h-8 shrink-0" />
            <div className="space-y-1">
              <h3 className="text-xl font-bold line-clamp-1">{title}</h3>
              <p className="text-lg opacity-90 line-clamp-2">{description}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          {progress > 0 && (
            <Badge variant="outline" className="bg-white/20 text-white">
              {progress}% complete
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}