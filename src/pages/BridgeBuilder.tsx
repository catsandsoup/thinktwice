import { useState } from "react";
import { Challenge } from "@/components/Challenge";
import { QuizHeader } from "@/components/QuizHeader";
import { useQuery } from "@tanstack/react-query";
import { Challenge as ChallengeType } from "@/data/challengeTypes";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function BridgeBuilder() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  const { data: allChallenges = [], isLoading } = useQuery({
    queryKey: ['bridge-builder-challenges'],
    queryFn: async () => {
      const { data: journey } = await supabase
        .from('journeys')
        .select('id')
        .eq('title', 'Bridge Builder')
        .single();

      if (!journey) throw new Error('Bridge Builder journey not found');

      const { data: challenges } = await supabase
        .from('challenges')
        .select(`
          *,
          standard_challenge_options (*),
          matching_challenges (
            id,
            matching_pairs (*)
          ),
          highlight_challenges (
            id,
            statement,
            highlight_texts (*)
          )
        `)
        .eq('journey_id', journey.id)
        .order('difficulty');

      // Map database fields to our frontend types
      return challenges?.map(challenge => ({
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        type: challenge.type,
        difficulty: challenge.difficulty,
        xpReward: challenge.xp_reward, // Map xp_reward to xpReward
        options: challenge.standard_challenge_options?.map(opt => ({
          id: opt.id,
          text: opt.text,
          isCorrect: opt.is_correct,
          explanation: opt.explanation
        })) || [],
        pairs: challenge.matching_challenges?.[0]?.matching_pairs?.map(pair => ({
          id: pair.id,
          claim: pair.claim,
          evidence: pair.evidence
        })) || [],
        statement: challenge.highlight_challenges?.[0]?.statement || '',
        highlights: challenge.highlight_challenges?.[0]?.highlight_texts?.map(ht => ({
          text: ht.text,
          explanation: ht.explanation
        })) || []
      })) || [];
    },
  });

  const handleChallengeComplete = (correct: boolean, xp: number) => {
    if (correct) {
      setCompletedChallenges(prev => {
        const newCompleted = new Set(prev);
        newCompleted.add(allChallenges[currentChallengeIndex].id);
        return newCompleted;
      });

      if (currentChallengeIndex < allChallenges.length - 1) {
        toast.success("Great job! Moving to the next challenge.");
        setCurrentChallengeIndex(prev => prev + 1);
      } else {
        toast.success("Congratulations! You've completed all challenges!");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!allChallenges || allChallenges.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">No challenges available</h1>
        <p className="text-gray-600">Please check back later for new challenges.</p>
      </div>
    );
  }

  const currentChallenge = allChallenges[currentChallengeIndex];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <QuizHeader 
        title="Bridge Builder Journey"
        currentQuestion={currentChallengeIndex + 1}
        totalQuestions={allChallenges.length}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bridge Builder Journey</h1>
        <p className="text-gray-600">
          Master the art of balancing emotional and logical thinking
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Challenge {currentChallengeIndex + 1} of {allChallenges.length}</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(completedChallenges.size / allChallenges.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <Challenge
        key={currentChallenge.id}
        {...currentChallenge}
        onComplete={handleChallengeComplete}
      />
    </div>
  );
}