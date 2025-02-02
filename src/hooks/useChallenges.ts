import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Challenge } from "@/data/challengeTypes";
import { shuffleArray } from "@/lib/utils";

export function useChallenges(difficulty?: "beginner" | "intermediate") {
  return useQuery({
    queryKey: ["challenges", difficulty],
    queryFn: async () => {
      let query = supabase
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
        `);

      if (difficulty) {
        query = query.eq("difficulty", difficulty);
      }

      const { data, error } = await query.order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching challenges:", error);
        throw error;
      }

      console.log(`Fetched ${difficulty || "all"} challenges:`, data);

      const transformedChallenges = data.map(challenge => {
        const baseChallenge = {
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          type: challenge.type as Challenge["type"],
          difficulty: challenge.difficulty,
          xpReward: challenge.xp_reward
        };

        switch (challenge.type) {
          case "word-selection":
            return {
              ...baseChallenge,
              type: "word-selection" as const,
              passage: challenge.word_selection_challenges?.[0]?.passage || "",
              keyWords: challenge.word_selection_challenges?.[0]?.word_selection_keywords?.map(k => ({
                word: k.word,
                explanation: k.explanation
              })) || []
            };
          case "highlight":
            return {
              ...baseChallenge,
              type: "highlight" as const,
              statement: challenge.highlight_challenges?.[0]?.statement || "",
              highlights: challenge.highlight_challenges?.[0]?.highlight_texts?.map(h => ({
                text: h.text,
                explanation: h.explanation
              })) || []
            };
          case "matching":
            return {
              ...baseChallenge,
              type: "matching" as const,
              pairs: challenge.matching_challenges?.[0]?.matching_pairs?.map(p => ({
                id: p.id.toString(),
                claim: p.claim,
                evidence: p.best_evidence
              })) || []
            };
          default:
            return {
              ...baseChallenge,
              type: "standard" as const,
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
}