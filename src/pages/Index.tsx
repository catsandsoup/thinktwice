import { useState } from "react";
import { LearningPath } from "@/components/LearningPath";
import { ProgressBar } from "@/components/ProgressBar";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [xp] = useState(150);
  const [maxXp] = useState(300);
  const [streak] = useState(3);

  const handlePathClick = (path: string) => {
    toast({
      title: "Coming Soon!",
      description: `The ${path} path will be available in the next update.`,
    });
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