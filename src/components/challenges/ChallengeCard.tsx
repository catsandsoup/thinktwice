import { Challenge } from "@/data/challengeTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

type ChallengeCardProps = {
  challenge: Challenge;
  children: React.ReactNode;
};

export function ChallengeCard({ challenge, children }: ChallengeCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl md:text-2xl font-semibold break-words animate-slide-in">
            {challenge.title}
          </CardTitle>
          <p className="text-sm md:text-base text-muted-foreground whitespace-pre-wrap break-words mt-2 animate-slide-in">
            {challenge.description}
          </p>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}