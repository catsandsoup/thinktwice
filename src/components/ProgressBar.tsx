import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface ProgressBarProps {
  xp: number;
  maxXp: number;
  streak: number;
}

export function ProgressBar({ xp, maxXp, streak }: ProgressBarProps) {
  const progress = (xp / maxXp) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Progress</span>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-gray-600">{xp} stars earned</span>
        </div>
      </div>
      <Progress 
        value={progress} 
        className="h-3 bg-purple-100" 
        indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-600"
      />
    </div>
  );
}