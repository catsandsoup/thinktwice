import { Progress } from "@/components/ui/progress";

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
        <span className="text-sm font-medium">XP Progress</span>
        <span className="text-sm text-muted-foreground">{xp}/{maxXp} XP</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-end">
        <span className="text-xs text-muted-foreground">🔥 {streak} day streak</span>
      </div>
    </div>
  );
}