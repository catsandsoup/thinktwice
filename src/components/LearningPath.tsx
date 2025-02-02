import { Card } from "@/components/ui/card";
import { Activity, Brain, BarChart3, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface LearningPathProps {
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  onClick: () => void;
  mission: string;
  actionText: string;
  labels?: string[];
}

export function LearningPath({ 
  title, 
  description, 
  level,
  onClick,
  mission,
  actionText,
  labels = []
}: LearningPathProps) {
  const Icon = {
    beginner: Brain,
    intermediate: BarChart3,
    advanced: MessageSquare,
  }[level];

  const colors = {
    beginner: {
      bg: "bg-purple-100",
      icon: "bg-purple-600 text-white",
      button: "bg-purple-600 hover:bg-purple-700",
      mission: "bg-purple-50",
      badge: "bg-purple-200 text-purple-700",
    },
    intermediate: {
      bg: "bg-blue-100",
      icon: "bg-blue-600 text-white",
      button: "bg-blue-600 hover:bg-blue-700",
      mission: "bg-blue-50",
      badge: "bg-blue-200 text-blue-700",
    },
    advanced: {
      bg: "bg-orange-100",
      icon: "bg-orange-600 text-white",
      button: "bg-orange-600 hover:bg-orange-700",
      mission: "bg-orange-50",
      badge: "bg-orange-200 text-orange-700",
    },
  }[level];

  return (
    <Card
      onClick={onClick}
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all hover:shadow-lg",
        colors.bg
      )}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className={cn("p-3 rounded-full", colors.icon)}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="text-xl font-bold line-clamp-1">{title}</h3>
            <p className="text-gray-600 line-clamp-2">{description}</p>
          </div>
        </div>

        {labels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {labels.map((label, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className={cn("font-medium", colors.badge)}
              >
                {label}
              </Badge>
            ))}
          </div>
        )}

        <div className={cn("p-4 rounded-lg space-y-2", colors.mission)}>
          <h4 className="font-semibold">Your Mission:</h4>
          <p className="text-gray-600">{mission}</p>
        </div>

        <button 
          className={cn(
            "w-full py-3 px-4 rounded-lg text-white font-medium transition-all focus:ring-2 focus:ring-offset-2",
            colors.button
          )}
        >
          {actionText}
        </button>
      </div>
    </Card>
  );
}