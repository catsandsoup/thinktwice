import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  xp: number;
  maxXp: number;
  streak: number;
}

export function ProgressBar({ xp, maxXp }: ProgressBarProps) {
  const progress = (xp / maxXp) * 100;

  return (
    <div className="space-y-2">
      <Progress 
        value={progress} 
        className="h-3 bg-purple-100" 
        indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-600"
      />
      <p className="text-sm text-purple-700 text-center">
        {Math.floor(progress)}% progress to next level
      </p>
    </div>
  );
}