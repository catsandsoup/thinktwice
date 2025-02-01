import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { challenges } from "@/data/challenges";
import { shuffleArray } from "@/lib/utils";

const BeginnersJourney = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const navigate = useNavigate();
  
  const [shuffledChallenges] = useState(() => shuffleArray([...challenges]));

  const handleComplete = (correct: boolean, xp: number) => {
    if (correct) {
      setTotalXP(prev => prev + xp);
    }
    
    if (!correct) return;
    
    if (currentChallenge === shuffledChallenges.length - 1) {
      navigate('/');
    } else {
      setCurrentChallenge(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
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
          className="mt-4"
        >
          Exit Journey
        </Button>
      </div>
    </div>
  );
};

export default BeginnersJourney;