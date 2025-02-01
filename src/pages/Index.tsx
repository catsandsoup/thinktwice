import { useState } from "react";
import { LearningPath } from "@/components/LearningPath";
import { ProgressBar } from "@/components/ProgressBar";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
      <main className="container px-4 py-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight">Think Twice</h1>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search lessons..." 
              className="pl-9 bg-background border-muted"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg text-muted-foreground">XP Progress</h2>
          <div className="flex justify-between items-baseline">
            <span className="text-3xl font-bold">{xp}/{maxXp} XP</span>
            <div className="flex items-center gap-2 text-orange-500">
              <span className="text-lg">🔥</span>
              <span>{streak} day streak</span>
            </div>
          </div>
          <ProgressBar xp={xp} maxXp={maxXp} streak={streak} />
        </div>

        <div className="grid gap-4 sm:gap-6">
          <LearningPath
            title="Beginner's Journey"
            description="Learn the basics of fact-checking and logical reasoning"
            level="beginner"
            onClick={() => handlePathClick("Beginner")}
            metadata={{
              duration: "2-3 hours",
              learners: "1.2k",
              progress: 60
            }}
          />
          <LearningPath
            title="Logic Master"
            description="Tackle complex logical fallacies and media analysis"
            level="intermediate"
            onClick={() => handlePathClick("Intermediate")}
            metadata={{
              duration: "4-5 hours",
              learners: "856",
              progress: 0
            }}
          />
          <LearningPath
            title="Expert Analyzer"
            description="Master advanced critical thinking and research methods"
            level="advanced"
            onClick={() => handlePathClick("Advanced")}
            metadata={{
              duration: "6-8 hours",
              learners: "432",
              progress: 0
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;