import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { shuffleArray } from "@/lib/utils";

const TruthExplorer = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);

  const { data: challenges, isLoading } = useQuery({
    queryKey: ['truth-explorer-challenges'],
    queryFn: async () => {
      // Fetch basic challenge information
      const { data: challengesData, error: challengesError } = await supabase
        .from('challenges')
        .select(`
          *,
          standard_challenge_options(*),
          word_selection_challenges(
            *,
            word_selection_keywords(*)
          ),
          matching_challenges(
            *,
            matching_pairs(*)
          ),
          highlight_challenges(
            *,
            highlight_texts(*)
          )
        `)
        .eq('difficulty', 'intermediate')
        .order('created_at', { ascending: true });

      if (challengesError) throw challengesError;

      // Transform the data to match the expected format
      const transformedChallenges = challengesData.map(challenge => {
        const baseChallenge = {
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          type: challenge.type,
          difficulty: challenge.difficulty,
          xpReward: challenge.xp_reward
        };

        switch (challenge.type) {
          case 'standard':
            return {
              ...baseChallenge,
              options: challenge.standard_challenge_options
            };
          case 'word-selection':
            const wordChallenge = challenge.word_selection_challenges[0];
            return {
              ...baseChallenge,
              passage: wordChallenge?.passage,
              keyWords: wordChallenge?.word_selection_keywords
            };
          case 'matching':
            const matchingChallenge = challenge.matching_challenges[0];
            return {
              ...baseChallenge,
              pairs: matchingChallenge?.matching_pairs
            };
          case 'highlight':
            const highlightChallenge = challenge.highlight_challenges[0];
            return {
              ...baseChallenge,
              statement: highlightChallenge?.statement,
              highlights: highlightChallenge?.highlight_texts
            };
          default:
            return baseChallenge;
        }
      });

      // Randomize the order of challenges
      return shuffleArray(transformedChallenges);
    }
  });

  const handleComplete = (correct: boolean) => {
    if (correct) {
      if (currentChallenge === (challenges?.length || 0) - 1) {
        navigate('/');
      } else {
        setCurrentChallenge(prev => prev + 1);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading challenges...</p>
        </div>
      </div>
    );
  }

  if (!challenges || challenges.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8 space-y-4">
          <h1 className="text-2xl font-bold text-center">No Challenges Available</h1>
          <p className="text-center text-muted-foreground">
            There are currently no intermediate challenges available.
          </p>
          <div className="flex justify-center">
            <Button onClick={() => navigate('/')}>Return Home</Button>
          </div>
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
        />

        {challenges[currentChallenge] && (
          <Challenge {...challenges[currentChallenge]} onComplete={handleComplete} />
        )}

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

export default TruthExplorer;