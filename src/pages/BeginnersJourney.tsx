import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { challenges } from "@/data/challenges";
import { shuffleArray } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

const BeginnersJourney = () => {
  const navigate = useNavigate();
  
  const beginnerChallenges = useMemo(() => 
    shuffleArray(challenges.filter(c => c.difficulty === "beginner")), 
  []);
  
  const [currentChallenge, setCurrentChallenge] = useState(0);

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

        <Challenge {...beginnerChallenges[currentChallenge]} onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default BeginnersJourney;