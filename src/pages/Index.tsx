import { useState } from "react";
import { LearningPath } from "@/components/LearningPath";
import { ProgressBar } from "@/components/ProgressBar";
import { useToast } from "@/hooks/use-toast";
import { Challenge } from "@/components/Challenge";

const Index = () => {
  const { toast } = useToast();
  const [xp, setXp] = useState(150);
  const [maxXp] = useState(300);
  const [streak] = useState(3);

  const handlePathClick = (path: string) => {
    toast({
      title: "Coming Soon!",
      description: `The ${path} path will be available in the next update.`,
    });
  };

  const handleChallengeComplete = (correct: boolean, earnedXp: number) => {
    if (correct) {
      setXp(prev => Math.min(prev + earnedXp, maxXp));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to CriticalMind</h1>
          <p className="text-xl text-muted-foreground">
            Master critical thinking through interactive challenges
          </p>
        </div>

        <ProgressBar xp={xp} maxXp={maxXp} streak={streak} />

        <Challenge
          title="Analyzing News Headlines"
          description="Compare these two headlines about the same climate study. Which one demonstrates more neutral, factual reporting?"
          type="headline"
          options={[
            {
              id: "1",
              text: "Study Shows 5% Temperature Rise in Arctic Region",
              isCorrect: true,
              explanation: "This headline presents the information neutrally, focusing on the specific data point without emotional language."
            },
            {
              id: "2",
              text: "CLIMATE CATASTROPHE: Earth's Fever Spirals Out of Control!",
              isCorrect: false,
              explanation: "This headline uses sensational language ('CATASTROPHE', 'Fever', 'Spirals') and emotional manipulation rather than presenting the facts objectively."
            }
          ]}
          difficulty="beginner"
          xpReward={50}
          onComplete={handleChallengeComplete}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <LearningPath
            title="Beginner's Journey"
            description="Learn the basics of fact-checking and logical reasoning"
            level="beginner"
            onClick={() => handlePathClick("Beginner")}
          />
          <LearningPath
            title="Logic Master"
            description="Tackle complex logical fallacies and media analysis"
            level="intermediate"
            onClick={() => handlePathClick("Intermediate")}
          />
          <LearningPath
            title="Expert Analyzer"
            description="Master advanced critical thinking and research methods"
            level="advanced"
            onClick={() => handlePathClick("Advanced")}
          />
        </div>

        <div className="rounded-lg bg-muted p-6">
          <h2 className="text-2xl font-semibold mb-4">Daily Challenge</h2>
          <p className="text-muted-foreground mb-4">
            Complete today's challenge to maintain your streak and earn bonus XP!
          </p>
          <button
            onClick={() => handlePathClick("Daily Challenge")}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Start Challenge
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;