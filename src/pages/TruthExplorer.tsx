import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { shuffleArray } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TruthExplorer = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  
  const { data: intermediateChallenges = [] } = useQuery({
    queryKey: ["intermediate-challenges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("challenges")
        .select(`
          *,
          standard_challenge_options(*),
          word_selection_challenges(
            passage,
            word_selection_keywords(*)
          ),
          highlight_challenges(
            statement,
            highlight_texts(*)
          ),
          matching_challenges(
            matching_pairs(*)
          )
        `)
        .eq("difficulty", "intermediate")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching challenges:", error);
        throw error;
      }

      console.log("Fetched intermediate challenges:", data);

      // Transform the data to match the Challenge type
      const transformedChallenges = data.map(challenge => {
        const baseChallenge = {
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          type: challenge.type,
          difficulty: challenge.difficulty,
          xpReward: challenge.xp_reward
        };

        switch (challenge.type) {
          case "word-selection":
            return {
              ...baseChallenge,
              passage: challenge.word_selection_challenges?.[0]?.passage || "",
              keyWords: challenge.word_selection_challenges?.[0]?.word_selection_keywords?.map(k => ({
                word: k.word,
                explanation: k.explanation
              })) || []
            };
          case "highlight":
            return {
              ...baseChallenge,
              statement: challenge.highlight_challenges?.[0]?.statement || "",
              highlights: challenge.highlight_challenges?.[0]?.highlight_texts?.map(h => ({
                text: h.text,
                explanation: h.explanation
              })) || []
            };
          case "matching":
            return {
              ...baseChallenge,
              pairs: challenge.matching_challenges?.[0]?.matching_pairs?.map(p => ({
                id: p.id.toString(),
                claim: p.claim,
                evidence: p.best_evidence
              })) || []
            };
          default:
            return {
              ...baseChallenge,
              options: challenge.standard_challenge_options?.map(o => ({
                id: o.id,
                text: o.text,
                isCorrect: o.is_correct,
                explanation: o.explanation
              })) || []
            };
        }
      });

      return shuffleArray(transformedChallenges);
    }
  });

  const handleComplete = (correct: boolean) => {
    if (correct) {
      if (currentChallenge === intermediateChallenges.length - 1) {
        navigate('/');
      } else {
        setCurrentChallenge(prev => prev + 1);
      }
    }
  };

  console.log("Current challenge index:", currentChallenge, "Total challenges:", intermediateChallenges.length);

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Journey
        </Button>

        <ChallengeProgress
          currentChallenge={currentChallenge}
          totalChallenges={intermediateChallenges.length}
        />

        {intermediateChallenges.length > 0 ? (
          <Challenge {...intermediateChallenges[currentChallenge]} onComplete={handleComplete} />
        ) : (
          <div className="text-center py-8">
            <p>No challenges available at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TruthExplorer;