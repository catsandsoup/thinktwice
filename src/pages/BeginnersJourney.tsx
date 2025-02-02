import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { useChallenges } from "@/hooks/useChallenges";
import { ChevronLeft } from "lucide-react";

const BeginnersJourney = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const { data: beginnerChallenges = [] } = useChallenges("beginner");

  const handleComplete = (correct: boolean) => {
    if (correct) {
      if (currentChallenge === beginnerChallenges.length - 1) {
        navigate('/');
      } else {
        setCurrentChallenge(prev => prev + 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Journey
        </Button>

        <ChallengeProgress
          currentChallenge={currentChallenge}
          totalChallenges={beginnerChallenges.length}
        />

        {beginnerChallenges.length > 0 ? (
          <Challenge {...beginnerChallenges[currentChallenge]} onComplete={handleComplete} />
        ) : (
          <div className="text-center py-8">
            <p>Loading challenges...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeginnersJourney;