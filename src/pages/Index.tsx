import { useState } from "react";
import { LearningPath } from "@/components/LearningPath";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QuestionsNavigation } from "@/components/QuestionsNavigation";

const Index = () => {
  const [stars] = useState(150);
  const [maxStars] = useState(300);
  const [level] = useState(3);
  const navigate = useNavigate();

  const handlePathClick = (path: string) => {
    switch(path) {
      case "Level 1":
        navigate('/beginners-journey');
        break;
      case "Level 2":
        navigate('/truth-explorer');
        break;
      default:
        toast({
          title: "Coming Soon!",
          description: `The ${path} path will be available in the next update.`,
        });
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <QuestionsNavigation />
        <main className="flex-1 pt-20 md:pt-24">
          <div className="container p-6 max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Your Thinking Journey</h1>
              <p className="text-xl text-gray-600">
                Learn to make better decisions in your daily life
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <LearningPath
                title="Level 1: Everyday Detective"
                description="Master the basics of critical thinking"
                level="beginner"
                onClick={() => handlePathClick("Level 1")}
                progress={0}
                mission="Learn to identify facts vs opinions, spot logical fallacies, and analyze headlines critically through interactive challenges"
                actionText="Start Level 1"
              />
              <LearningPath
                title="Level 2: Truth Explorer"
                description="Advanced critical analysis techniques"
                level="intermediate"
                onClick={() => handlePathClick("Level 2")}
                progress={0}
                mission="Master complex reasoning, evaluate evidence quality, and identify hidden assumptions in arguments"
                actionText="Start Level 2"
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;