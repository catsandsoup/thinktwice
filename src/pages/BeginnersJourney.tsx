import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { supabase } from "@/integrations/supabase/client";
import { allChallenges } from "@/data/challenges";

const STARS_PER_LEVEL = 25;

const BeginnersJourney = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userProgress, setUserProgress] = useState({ level: 1, stars: 0 });
  const [seenChallenges, setSeenChallenges] = useState<Set<string>>(new Set());

  // Load seen challenges from localStorage on mount
  useEffect(() => {
    const loadSeenChallenges = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const storedChallenges = localStorage.getItem(`seen-challenges-${user.id}`);
        if (storedChallenges) {
          setSeenChallenges(new Set(JSON.parse(storedChallenges)));
        }
      }
    };
    loadSeenChallenges();
  }, []);

  // Load user progress from Supabase
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

  // Filter out seen challenges and shuffle the remaining ones
  const availableChallenges = allChallenges
    .filter(challenge => !seenChallenges.has(challenge.id))
    .sort(() => Math.random() - 0.5); // Shuffle the challenges

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

        // Mark current challenge as seen and persist to localStorage
        if (availableChallenges[currentChallenge]) {
          const newSeenChallenges = new Set(seenChallenges);
          newSeenChallenges.add(availableChallenges[currentChallenge].id);
          setSeenChallenges(newSeenChallenges);
          localStorage.setItem(
            `seen-challenges-${user.id}`,
            JSON.stringify(Array.from(newSeenChallenges))
          );
        }
      }
      
      if (currentChallenge === availableChallenges.length - 1) {
        navigate('/');
      } else {
        setCurrentChallenge(prev => prev + 1);
      }
    }
  };

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