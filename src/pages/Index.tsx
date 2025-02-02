import { LearningPath } from "@/components/LearningPath";
import { UserAchievements } from "@/components/UserAchievements";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();

  const handlePathClick = (path: string) => {
    switch (path) {
      case "Beginner":
        navigate('/beginners-journey');
        break;
      case "Argument":
        navigate('/argument-analysis');
        break;
      default:
        toast({
          title: "Coming Soon!",
          description: `The ${path} path will be available in the next update.`,
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container p-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Critical Thinking Journey</h1>
          <p className="text-xl text-gray-600">
            Master the art of clear, logical thinking
          </p>
        </div>

        <UserAchievements />

        <div className="grid md:grid-cols-2 gap-8">
          <LearningPath
            title="Argument Analysis"
            description="Master the art of evaluating claims and spotting logical fallacies"
            level="beginner"
            onClick={() => handlePathClick("Beginner")}
            mission="Learn to analyze arguments and identify reliable information from questionable claims"
            actionText="Continue Learning"
            labels={["Logical Fallacies", "Claim Analysis", "Evidence Evaluation"]}
          />
          <LearningPath
            title="Data Detective"
            description="Learn to spot misleading statistics and interpret data correctly"
            level="intermediate"
            onClick={() => handlePathClick("Argument")}
            mission="Master the art of analyzing data and identifying statistical manipulation"
            actionText="Unlock Module"
            labels={["Statistical Analysis", "Data Visualization", "Correlation vs Causation"]}
          />
          <LearningPath
            title="Thinking Tools"
            description="Master different analytical methods including 5 Whys and Socratic questioning"
            level="advanced"
            onClick={() => handlePathClick("Tools")}
            mission="Learn and practice systematic approaches to problem-solving"
            actionText="Start Practice"
            labels={["5 Whys", "Lateral Thinking", "Systematic Approach"]}
          />
          <LearningPath
            title="Emotion vs Logic"
            description="Learn to separate emotional reactions from logical arguments"
            level="emotion"
            onClick={() => handlePathClick("Emotion")}
            mission="Develop skills to evaluate arguments objectively and manage emotional bias"
            actionText="Explore Challenges"
            labels={["Emotional Intelligence", "Bias Recognition", "Objective Analysis"]}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;