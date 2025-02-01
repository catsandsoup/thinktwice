import { Card } from "@/components/ui/card";
import { Brain, Trophy, GraduationCap, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface LearningPathProps {
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  onClick: () => void;
  metadata: {
    duration: string;
    learners: string;
    progress: number;
  };
}

const levelIcons = {
  beginner: Brain,
  intermediate: Trophy,
  advanced: GraduationCap,
};

const levelStyles = {
  beginner: "bg-primary hover:bg-primary/90",
  intermediate: "bg-secondary hover:bg-secondary/90",
  advanced: "bg-accent hover:bg-accent/90",
};

export function LearningPath({ title, description, level, onClick, metadata }: LearningPathProps) {
  const Icon = levelIcons[level];
  
  return (
    <Card 
      className={cn(
        "relative overflow-hidden p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]",
        levelStyles[level],
        "text-white"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Icon className="w-8 h-8 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
              <p className="text-lg opacity-90">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{metadata.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>{metadata.learners} active learners</span>
          </div>
          {metadata.progress > 0 ? (
            <Badge variant="outline" className="bg-white/20 text-white">
              {metadata.progress}% complete
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-white/20 text-white">
              {level}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}