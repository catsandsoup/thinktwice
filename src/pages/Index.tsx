import { LearningPath } from "@/components/LearningPath";
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
            mission="Learn to analyze social media posts and identify reliable information from questionable claims"
            actionText="Start Your Investigation"
          />
          <LearningPath
            title="Argument Analysis"
            description="Master the art of evaluating and constructing sound arguments"
            level="intermediate"
            onClick={() => handlePathClick("Argument")}
            mission="Learn to identify logical fallacies and strengthen your reasoning skills"
            actionText="Begin Analysis"
          />
          <div className="opacity-50 pointer-events-none">
            <LearningPath
              title="Financial Literacy"
              description="Think critically about financial decisions and claims"
              level="advanced"
              onClick={() => handlePathClick("Finance")}
              mission="Develop skills to evaluate investment claims and make informed financial decisions"
              actionText="Start Learning"
            />
          </div>
          <div className="opacity-50 pointer-events-none">
            <LearningPath
              title="Scientific Method"
              description="Apply scientific thinking to everyday claims"
              level="advanced"
              onClick={() => handlePathClick("Science")}
              mission="Learn to evaluate scientific claims and understand research methodology"
              actionText="Explore Science"
            />
          </div>
          <div className="opacity-50 pointer-events-none">
            <LearningPath
              title="Research Skills"
              description="Find and evaluate reliable information effectively"
              level="intermediate"
              onClick={() => handlePathClick("Research")}
              mission="Master the art of finding and evaluating credible sources"
              actionText="Begin Research"
            />
          </div>
          <div className="opacity-50 pointer-events-none">
            <LearningPath
              title="Media Literacy"
              description="Navigate and analyze modern media landscape"
              level="intermediate"
              onClick={() => handlePathClick("Media")}
              mission="Develop critical skills for evaluating news and social media content"
              actionText="Start Journey"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
