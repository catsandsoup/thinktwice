import { motion } from "framer-motion";

interface UserProgressProps {
  progress: {
    total_challenges_completed: number;
    streak_count: number;
  } | null;
}

export function UserProgress({ progress }: UserProgressProps) {
  if (!progress) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
    >
      <h2 className="text-2xl font-semibold mb-4">Your Learning Journey</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-primary/10 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Insights Gained</p>
          <p className="text-2xl font-bold">{progress.total_challenges_completed}</p>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Days Active</p>
          <p className="text-2xl font-bold">{progress.streak_count}</p>
        </div>
      </div>
    </motion.div>
  );
}