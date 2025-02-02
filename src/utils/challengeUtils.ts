import { supabase } from "@/integrations/supabase/client";

export const recordChallengeCompletion = async (userId: string, challengeId: string, xpEarned: number) => {
  try {
    // First check if challenge is already completed
    const { data: existingCompletion } = await supabase
      .from('completed_challenges')
      .select('id')
      .eq('challenge_id', challengeId)
      .eq('user_id', userId)
      .maybeSingle();

    // If already completed, return early
    if (existingCompletion) {
      return { success: true, alreadyCompleted: true };
    }

    // Record the completed challenge
    const { error: completionError } = await supabase
      .from('completed_challenges')
      .insert({
        challenge_id: challengeId,
        user_id: userId,
        xp_earned: xpEarned
      });

    if (completionError) throw completionError;

    return { success: true, alreadyCompleted: false };
  } catch (error) {
    console.error('Error recording challenge completion:', error);
    return { success: false, error };
  }
};

export const updateUserAchievements = async (userId: string) => {
  try {
    const { count } = await supabase
      .from('completed_challenges')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    await checkAndAwardBadges(userId, count || 0, 10);
  } catch (error) {
    console.error('Error updating achievements:', error);
  }
};