import { Card } from "@/components/ui/card";
import { Brain, Trophy, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningPathProps {
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  onClick: () => void;
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

export function LearningPath({ title, description, level, onClick }: LearningPathProps) {
  const Icon = levelIcons[level];
  
  return (
    <Card 
      className={cn(
        "relative overflow-hidden p-6 cursor-pointer transition-all duration-300 transform hover:scale-105",
        levelStyles[level],
        "text-white"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <Icon className="w-8 h-8" />
        <div className="space-y-2">
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </Card>
  );
}