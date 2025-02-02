import { LearningPath } from "@/components/LearningPath";
import { UserAchievements } from "@/components/UserAchievements";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Settings, LogOut } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { supabase } from "@/integrations/supabase/client";
import { awardPathBadge } from "@/utils/pathBadges";

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

  const handleNavigation = async (index: number | null) => {
    if (index === 0) {
      navigate("/settings");
    } else if (index === 1) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Error signing out");
      } else {
        navigate("/login");
      }
    }
  };

  const navigationTabs = [
    { title: "Settings", icon: Settings },
    { title: "Sign Out", icon: LogOut },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="container p-6">
        <div className="flex justify-center mb-4">
          <ExpandableTabs 
            tabs={navigationTabs} 
            onChange={handleNavigation}
            className="border-gray-200 dark:border-gray-800"
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Think Twice</h1>
          <p className="text-xl text-gray-600">
            Master the art of clear, logical thinking
          </p>
        </div>
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