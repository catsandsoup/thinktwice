import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { useQuery } from "@tanstack/react-query";
import { fetchAllChallenges } from "@/lib/queries";
import { shuffleArray } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

const STARS_PER_LEVEL = 25;

const BeginnersJourney = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userProgress, setUserProgress] = useState({ level: 1, stars: 0 });

  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchAllChallenges,
    select: (data) => {
      const beginnerChallenges = data.filter(challenge => challenge.difficulty === 'beginner');
      return shuffleArray([...beginnerChallenges]);
    }
  });

  useEffect(() => {
    const fetchUserProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: progress } = await supabase
          .from('user_progress')
          .select('level, stars')
          .eq('user_id', user.id)
          .single();

        if (progress) {
          setUserProgress(progress);
        }
      }
    };

    fetchUserProgress();
  }, []);

  const handleComplete = async (correct: boolean, xp: number) => {
    if (correct) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const newStars = userProgress.stars + 1;
        const newLevel = Math.floor(newStars / STARS_PER_LEVEL) + 1;
        
        const { error: updateError } = await supabase
          .from('user_progress')
          .update({ 
            stars: newStars,
            level: newLevel
          })
          .eq('user_id', user.id);

        if (!updateError) {
          setUserProgress({ stars: newStars, level: newLevel });
        }
      }
      
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

  const maxXp = STARS_PER_LEVEL;
  const currentLevelStars = userProgress.stars % STARS_PER_LEVEL;

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <ChallengeProgress
          currentChallenge={currentChallenge}
          totalChallenges={challenges.length}
          xp={currentLevelStars}
          maxXp={maxXp}
          streak={userProgress.level}
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