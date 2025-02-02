import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { shuffleArray } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Challenge as ChallengeType } from "@/data/challengeTypes";

const TruthExplorer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentChallenge, setCurrentChallenge] = useState(0);

  const { data: challenges, isLoading } = useQuery({
    queryKey: ['truth-explorer-challenges'],
    queryFn: async () => {
      try {
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
              challenge_id,
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
            case "standard":
            case "headline":
            case "fallacy":
            case "media":
            case "source":
            case "analysis-construction":
            case "argument-construction":
              return {
                ...baseChallenge,
                type: challenge.type,
                options: challenge.standard_challenge_options?.map(opt => ({
                  id: opt.id,
                  text: opt.text,
                  isCorrect: opt.is_correct,
                  explanation: opt.explanation
                })) || []
              } as ChallengeType;
            
            case "word-selection":
              const wordChallenge = challenge.word_selection_challenges?.[0];
              return {
                ...baseChallenge,
                type: "word-selection" as const,
                passage: wordChallenge?.passage || '',
                keyWords: wordChallenge?.word_selection_keywords?.map(kw => ({
                  word: kw.word,
                  explanation: kw.explanation
                })) || []
              } as ChallengeType;
            
            case "matching":
              if (!challenge.matching_challenges?.[0]?.matching_pairs?.length) {
                console.error('Matching challenge data is missing or incomplete:', challenge);
                return null;
              }
              return {
                ...baseChallenge,
                type: "matching" as const,
                pairs: challenge.matching_challenges[0].matching_pairs.map(pair => ({
                  id: pair.id.toString(),
                  claim: pair.claim,
                  evidence: pair.best_evidence
                }))
              } as ChallengeType;
            
            case "highlight":
              const highlightChallenge = challenge.highlight_challenges?.[0];
              return {
                ...baseChallenge,
                type: "highlight" as const,
                statement: highlightChallenge?.statement || '',
                highlights: highlightChallenge?.highlight_texts?.map(text => ({
                  text: text.text,
                  explanation: text.explanation
                })) || []
              } as ChallengeType;
            
            default:
              console.error('Unknown challenge type:', challenge.type);
              return null;
          }
        }).filter(Boolean) as ChallengeType[];

        return shuffleArray(transformedChallenges);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        toast({
          title: "Error",
          description: "Failed to load challenges. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    }
  });

  const handleComplete = (correct: boolean, xp: number) => {
    if (correct) {
      if (currentChallenge === (challenges?.length || 0) - 1) {
        toast({
          title: "Journey Complete! 🎉",
          description: "You've completed all intermediate challenges!",
        });
        navigate('/');
      } else {
        setCurrentChallenge(prev => prev + 1);
        toast({
          title: "Great job! 🌟",
          description: "Moving to the next challenge...",
        });
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
