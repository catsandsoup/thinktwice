import { useState } from "react";
import { LearningPath } from "@/components/LearningPath";
import { ProgressBar } from "@/components/ProgressBar";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [xp] = useState(150);
  const [maxXp] = useState(300);
  const [streak] = useState(3);
  const navigate = useNavigate();

  const handlePathClick = (path: string) => {
    if (path === "Beginner") {
      navigate('/beginners-journey');
    } else {
      toast({
        title: "Coming Soon!",
        description: `The ${path} path will be available in the next update.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Think Twice</h1>
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
      </main>
    </div>
  );
};

export default Index;