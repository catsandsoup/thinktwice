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
import { toast } from "sonner";

const STARS_PER_LEVEL = 25;

const BeginnersJourney = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userProgress, setUserProgress] = useState({ level: 1, stars: 0 });

  // Fetch user progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
        return;
      }

      const { data: progress, error } = await supabase
        .from('user_progress')
        .select('level, stars')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user progress:', error);
        toast.error('Failed to load your progress');
        return;
      }

      if (progress) {
        setUserProgress(progress);
      }
    };

    fetchUserProgress();
  }, [navigate]);

  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchAllChallenges,
    select: (data) => {
      const beginnerChallenges = data.filter(challenge => challenge.difficulty === 'beginner');
      return shuffleArray([...beginnerChallenges]);
    }
  });

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

        if (updateError) {
          console.error('Error updating progress:', updateError);
          toast.error('Failed to update your progress');
        } else {
          setUserProgress({ stars: newStars, level: newLevel });
          toast.success(`You earned a star! ${STARS_PER_LEVEL - (newStars % STARS_PER_LEVEL)} more to reach level ${newLevel + 1}`);
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

  const currentLevelStars = userProgress.stars % STARS_PER_LEVEL;

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <ChallengeProgress
          currentChallenge={currentChallenge}
          totalChallenges={challenges.length}
          xp={currentLevelStars}
          maxXp={STARS_PER_LEVEL}
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