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
      case "Beginner":
        navigate('/beginners-journey');
        break;
      case "Intermediate":
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
        <main className="flex-1 pt-16">
          <div className="container p-6 max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Your Thinking Journey</h1>
              <p className="text-xl text-gray-600">
                Learn to make better decisions in your daily life
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <LearningPath
                title="Everyday Detective"
                description="Spot clues that help you make better choices"
                level="beginner"
                onClick={() => handlePathClick("Beginner")}
                progress={60}
                mission="Learn to spot the difference between facts and opinions in social media posts"
                actionText="Start Your Investigation"
              />
              <LearningPath
                title="Truth Explorer"
                description="Find out what makes a good explanation"
                level="intermediate"
                onClick={() => handlePathClick("Intermediate")}
                progress={0}
                mission="Discover reliable ways to check information you see online"
                actionText="Begin Quest"
              />
              <LearningPath
                title="Fact Finder"
                description="Learn to check if something is really true"
                level="advanced"
                onClick={() => handlePathClick("Advanced")}
                progress={0}
                mission="Discover reliable ways to check information you see online"
                actionText="Begin Quest"
              />
              <LearningPath
                title="Digital Guardian"
                description="Protect yourself from misleading information"
                level="advanced"
                onClick={() => handlePathClick("Advanced")}
                progress={0}
                mission="Learn to recognize and avoid misleading online content"
                actionText="Accept Challenge"
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;