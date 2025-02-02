import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { useQuery } from "@tanstack/react-query";
import { fetchAllChallenges } from "@/lib/queries";
import { shuffleArray } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const BeginnersJourney = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchAllChallenges,
    select: (data) => shuffleArray([...data])
  });

  const handleComplete = (correct: boolean, xp: number) => {
    if (correct) {
      setTotalXP(prev => prev + xp);
      
      if (challenges && currentChallenge === challenges.length - 1) {
        navigate('/');
      } else {
        setCurrentChallenge(prev => prev + 1);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
          <Skeleton className="h-8 w-full max-w-md" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
          <div className="text-red-500">
            Error loading challenges. Please try again later.
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  if (!challenges || challenges.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
          <div className="text-muted-foreground">
            No challenges available at the moment.
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <ChallengeProgress
          currentChallenge={currentChallenge}
          totalChallenges={challenges.length}
          xp={totalXP}
          maxXp={100}
          streak={1}
        />

        <Challenge {...challenges[currentChallenge]} onComplete={handleComplete} />

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