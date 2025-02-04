import { Card } from "@/components/ui/card";
import { Activity, Brain, BarChart3, MessageSquare, Handshake } from "lucide-react";
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
  customColor?: string;
  customIcon?: string;
}

export function LearningPath({ 
  title, 
  description, 
  level,
  onClick,
  mission,
  actionText,
  labels = [],
  customColor,
  customIcon
}: LearningPathProps) {
  const Icon = customIcon === "handshake" ? Handshake : {
    beginner: Brain,
    intermediate: BarChart3,
    advanced: MessageSquare,
  }[level];

  const colors = {
    beginner: {
      bg: "bg-purple-100 dark:bg-purple-900/20",
      icon: "bg-purple-600 text-white dark:bg-purple-500",
      button: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600",
      mission: "bg-purple-50 dark:bg-purple-900/40",
      badge: "bg-purple-200 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    },
    intermediate: {
      bg: "bg-blue-100 dark:bg-blue-900/20",
      icon: "bg-blue-600 text-white dark:bg-blue-500",
      button: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
      mission: "bg-blue-50 dark:bg-blue-900/40",
      badge: "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    advanced: {
      bg: "bg-orange-100 dark:bg-orange-900/20",
      icon: "bg-orange-600 text-white dark:bg-orange-500",
      button: "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600",
      mission: "bg-orange-50 dark:bg-orange-900/40",
      badge: "bg-orange-200 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    },
  }[level];

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        customColor ? `bg-[${customColor}]` : colors.bg
      )}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className={cn("p-3 rounded-full", colors.icon)}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="text-xl font-bold line-clamp-1">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
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
          <h4 className="font-semibold">Your Learning Goal:</h4>
          <p className="text-gray-600 dark:text-gray-300">{mission}</p>
        </div>

        <button 
          onClick={onClick}
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