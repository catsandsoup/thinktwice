import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  xp: number;
  maxXp: number;
  streak: number;
}

export function ProgressBar({ xp, maxXp }: ProgressBarProps) {
  const progress = (xp / maxXp) * 100;

  return (
    <Progress 
      value={progress} 
      className="h-3 bg-gray-100" 
    />
  );
}