import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { useQuery } from "@tanstack/react-query";
import { fetchAllChallenges } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { Challenge as ChallengeType } from "@/data/challengeTypes";

const STARS_PER_LEVEL = 25;

const BeginnersJourney = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userProgress, setUserProgress] = useState({ level: 1, stars: 0 });
  const [seenChallenges, setSeenChallenges] = useState<Set<string>>(new Set());

  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchAllChallenges,
    select: (data) => {
      // Filter beginner challenges and ensure we get all types
      const beginnerChallenges = data.filter(challenge => 
        challenge.difficulty === 'beginner' &&
        ['fallacy', 'media', 'source', 'headline'].includes(challenge.type)
      );
      
      // Create a map to detect and remove duplicates based on content similarity
      const uniqueChallenges = new Map<string, ChallengeType>();
      
      beginnerChallenges.forEach(challenge => {
        // Create a unique key based on normalized content
        const contentKey = `${challenge.title.toLowerCase().trim()}-${challenge.description.toLowerCase().trim()}`;
        
        // Only keep the first instance of each challenge
        if (!uniqueChallenges.has(contentKey)) {
          uniqueChallenges.set(contentKey, challenge);
        }
      });
      
      // Convert back to array and shuffle
      return Array.from(uniqueChallenges.values())
        .sort(() => Math.random() - 0.5);
    }
  });

  // Memoize the filtered challenges to prevent unnecessary re-renders
  const availableChallenges = useMemo(() => {
    if (!challenges) return [];
    return challenges.filter(challenge => !seenChallenges.has(challenge.id));
  }, [challenges, seenChallenges]);

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

        // Mark current challenge as seen
        if (challenges && challenges[currentChallenge]) {
          setSeenChallenges(prev => new Set([...prev, challenges[currentChallenge].id]));
        }
      }
      
      if (!availableChallenges.length || currentChallenge === availableChallenges.length - 1) {
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

  if (!availableChallenges || availableChallenges.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
          <div className="text-muted-foreground">
            You've completed all available challenges for now. Great job!
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
          totalChallenges={availableChallenges.length}
          xp={currentLevelStars}
          maxXp={maxXp}
          streak={userProgress.level}
        />

        <Challenge {...availableChallenges[currentChallenge]} onComplete={handleComplete} />

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