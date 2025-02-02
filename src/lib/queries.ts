import { supabase } from "@/integrations/supabase/client";
import { Challenge } from "@/data/challengeTypes";

export async function fetchAllChallenges(): Promise<Challenge[]> {
  // Fetch base challenges
  const { data: challenges, error: challengesError } = await supabase
    .from('challenges')
    .select(`
      *,
      standard_challenge_options(*),
      word_selection_challenges(
        *,
        word_selection_keywords(*)
      ),
      highlight_challenges(
        *,
        highlight_texts(*)
      ),
      matching_challenges(
        *,
        matching_pairs(*)
      )
    `);

  if (challengesError) {
    console.error('Error fetching challenges:', challengesError);
    throw challengesError;
  }

  if (!challenges) return [];

  return challenges.map(challenge => {
    const baseChallenge = {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      type: challenge.type,
      difficulty: challenge.difficulty,
      xpReward: challenge.xp_reward
    };

    switch (challenge.type) {
      case 'headline':
      case 'fallacy':
      case 'media':
      case 'source':
        return {
          ...baseChallenge,
          type: challenge.type,
          options: challenge.standard_challenge_options?.map(opt => ({
            id: opt.id,
            text: opt.text,
            isCorrect: opt.is_correct,
            explanation: opt.explanation
          })) || []
        };

      case 'word-selection':
        const wordSelection = challenge.word_selection_challenges?.[0];
        return {
          ...baseChallenge,
          type: 'word-selection' as const,
          passage: wordSelection?.passage || '',
          keyWords: wordSelection?.word_selection_keywords?.map(kw => ({
            word: kw.word,
            explanation: kw.explanation
          })) || []
        };

      case 'highlight':
        const highlightChallenge = challenge.highlight_challenges?.[0];
        return {
          ...baseChallenge,
          type: 'highlight' as const,
          statement: highlightChallenge?.statement || '',
          highlights: highlightChallenge?.highlight_texts?.map(ht => ({
            text: ht.text,
            explanation: ht.explanation
          })) || []
        };

      case 'matching':
        const matchingChallenge = challenge.matching_challenges?.[0];
        return {
          ...baseChallenge,
          type: 'matching' as const,
          pairs: matchingChallenge?.matching_pairs?.map(pair => ({
            id: pair.id,
            claim: pair.claim,
            evidence: pair.evidence
          })) || []
        };

      default:
        return baseChallenge as Challenge;
    }
  }) as Challenge[];
}