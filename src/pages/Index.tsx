import { LearningPath } from "@/components/LearningPath";
import { UserAchievements } from "@/components/UserAchievements";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { awardPathBadge } from "@/utils/pathBadges";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const navigate = useNavigate();

  const handlePathClick = async (path: string) => {
    switch (path) {
      case "Beginner":
        navigate('/beginners-journey');
        await awardPathBadge("Beginner's Path");
        break;
      case "Argument":
        navigate('/argument-analysis');
        await awardPathBadge("Argument Master");
        break;
      case "Tools":
        navigate('/thinking-tools');
        await awardPathBadge("Tool Expert");
        break;
      case "Bridge":
        navigate('/bridge-builder');
        await awardPathBadge("Bridge Builder");
        break;
      default:
        toast.info(`The ${path} path will be available in the next update.`, {
          description: "Coming Soon!"
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="container p-6 flex justify-between items-center">
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold tracking-tight">Think Twice</h1>
          <p className="text-xl text-gray-600">
            Master the art of clear, logical thinking
          </p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate through your learning journey
              </SheetDescription>
            </SheetHeader>
            <nav className="mt-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/settings")}
              >
                Settings
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <main className="container p-6 max-w-6xl mx-auto space-y-8">
        <UserAchievements />
        <div className="grid md:grid-cols-2 gap-8">
          <LearningPath
            title="Everyday Detective"
            description="Spot clues that help you make better choices"
            level="beginner"
            onClick={() => handlePathClick("Beginner")}
            mission="Learn to analyze social media posts and identify reliable information from questionable claims"
            actionText="Start Your Investigation"
            labels={["Social Media Analysis", "Fact Checking", "Source Evaluation"]}
          />
          <LearningPath
            title="Argument Analysis"
            description="Master the art of evaluating claims and spotting logical fallacies"
            level="intermediate"
            onClick={() => handlePathClick("Argument")}
            mission="Learn to identify logical fallacies and strengthen your reasoning skills"
            actionText="Begin Analysis"
            labels={["Logical Fallacies", "Claim Evaluation", "Reasoning Skills"]}
          />
          <LearningPath
            title="Bridge Builder"
            description="Balance emotional and logical thinking while building understanding"
            level="intermediate"
            onClick={() => handlePathClick("Bridge")}
            mission="Learn to identify emotional triggers and convert them into logical arguments"
            actionText="Start Building Bridges"
            labels={["Emotional Intelligence", "Logical Analysis", "Conflict Resolution"]}
            customColor="#FFDEE2"
            customIcon="handshake"
          />
          <LearningPath
            title="Thinking Tools"
            description="Master different analytical methods including 5 Whys and Socratic questioning"
            level="advanced"
            onClick={() => handlePathClick("Tools")}
            mission="Learn and practice systematic approaches to problem-solving"
            actionText="Start Practice"
            labels={["Systematic Analysis", "Lateral Thinking", "Creative Problem-Solving"]}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;