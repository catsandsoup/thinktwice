import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { challenges } from "@/data/challenges";
import { shuffleArray } from "@/lib/utils";

const BeginnersJourney = () => {
  const navigate = useNavigate();
  
  const shuffledChallenges = useMemo(() => shuffleArray([...challenges]), []);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  const handleComplete = (correct: boolean, xp: number) => {
    if (correct) {
      setTotalXP(prev => prev + xp);
      
      if (currentChallenge === shuffledChallenges.length - 1) {
        navigate('/');
      } else {
        setCurrentChallenge(prev => prev + 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <ChallengeProgress
          currentChallenge={currentChallenge}
          totalChallenges={shuffledChallenges.length}
          xp={totalXP}
          maxXp={100}
          streak={1}
        />

        <Challenge {...shuffledChallenges[currentChallenge]} onComplete={handleComplete} />

        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="w-full sm:w-auto"
        >
          Exit Journey
        </Button>
      </div>
    </div>
  );
};

export default BeginnersJourney;