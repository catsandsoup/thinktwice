import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { supabase } from "@/integrations/supabase/client";
import { allChallenges } from "@/data/challenges";
import { ArrowLeft } from "lucide-react";

const BeginnersJourney = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [seenChallenges, setSeenChallenges] = useState<Set<string>>(new Set());

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

  const availableChallenges = allChallenges
    .filter(challenge => !seenChallenges.has(challenge.id))
    .sort(() => Math.random() - 0.5);

  const handleComplete = async (correct: boolean) => {
    if (correct) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && availableChallenges[currentChallenge]) {
        const newSeenChallenges = new Set(seenChallenges);
        newSeenChallenges.add(availableChallenges[currentChallenge].id);
        setSeenChallenges(newSeenChallenges);
        localStorage.setItem(
          `seen-challenges-${user.id}`,
          JSON.stringify(Array.from(newSeenChallenges))
        );
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
        <div className="container px-4 py-4 space-y-4">
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 space-y-4">
        <div className="flex items-center justify-between gap-4 pt-2 sm:pt-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="h-8 px-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Exit
            </Button>
            <h1 className="text-xl sm:text-2xl font-display font-medium text-purple-900">
              Beginner's Journey
            </h1>
          </div>
          <span className="flex-shrink-0 text-sm font-medium text-purple-700 bg-purple-50/80 px-3 py-1 rounded-full">
            {currentChallenge + 1} of {availableChallenges.length}
          </span>
        </div>

        <Challenge {...availableChallenges[currentChallenge]} onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default BeginnersJourney;