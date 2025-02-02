import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { useChallenges } from "@/hooks/useChallenges";
import { ChevronLeft } from "lucide-react";

const TruthExplorer = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const { data: intermediateChallenges = [] } = useChallenges("intermediate");

  const handleComplete = (correct: boolean) => {
    if (correct) {
      if (currentChallenge === intermediateChallenges.length - 1) {
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
          totalChallenges={intermediateChallenges.length}
        />

        {intermediateChallenges.length > 0 && (
          <Challenge 
            {...intermediateChallenges[currentChallenge]} 
            onComplete={handleComplete} 
          />
        )}
      </div>
    </div>
  );
};

export default TruthExplorer;