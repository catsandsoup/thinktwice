
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

type UserProgressProps = {
  progress: any;
  isLoading?: boolean;
};

export function UserProgress({ progress, isLoading = false }: UserProgressProps) {
  // Calculate progress percentage
  const calculateLevel = (challenges: number) => {
    if (challenges < 5) return 1;
    if (challenges < 15) return 2;
    if (challenges < 30) return 3;
    if (challenges < 50) return 4;
    return 5;
  };

  const calculateProgress = (challenges: number) => {
    const level = calculateLevel(challenges);
    const thresholds = [0, 5, 15, 30, 50, 75];
    const min = thresholds[level - 1];
    const max = thresholds[level];
    return Math.min(100, ((challenges - min) / (max - min)) * 100);
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-2 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!progress) {
    return null;
  }

  const challenges = progress.total_challenges_completed || 0;
  const currentLevel = calculateLevel(challenges);
  const progressPercent = calculateProgress(challenges);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-12"
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">Level {currentLevel}</div>
              <div className="text-sm text-muted-foreground">{challenges} challenges completed</div>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold">{currentLevel}</div>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold">{progress.streak_count || 0}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
