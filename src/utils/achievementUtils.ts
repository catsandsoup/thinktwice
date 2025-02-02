import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const checkAndUpdateStreak = async (userId: string) => {
  try {
    const { data: achievement } = await supabase
      .from('user_achievements')
      .select('last_login, streak_count')
      .eq('user_id', userId)
      .single();

    if (!achievement) return;

    const lastLogin = new Date(achievement.last_login);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));

    let newStreak = achievement.streak_count;
    if (diffDays > 1) {
      // Reset streak if more than 1 day has passed
      newStreak = 0;
    } else if (diffDays === 1) {
      // Increment streak if exactly 1 day has passed
      newStreak += 1;
    }

    const { error } = await supabase
      .from('user_achievements')
      .update({
        streak_count: newStreak,
        last_login: now.toISOString()
      })
      .eq('user_id', userId);

    if (error) throw error;

    // Award streak-based badges
    if (newStreak === 7) {
      await awardBadge(userId, 'Week Warrior');
    } else if (newStreak === 30) {
      await awardBadge(userId, 'Monthly Master');
    }
  } catch (error) {
    console.error('Error updating streak:', error);
  }
};

export const checkAndAwardBadges = async (userId: string, challengeCount: number, xpReward: number) => {
  try {
    // First challenge completion
    if (challengeCount === 1) {
      await awardBadge(userId, 'First Steps');
    }

    // Challenge champion (50 challenges)
    if (challengeCount === 50) {
      await awardBadge(userId, 'Challenge Champion');
    }

    // Perfect score
    if (xpReward === 10) {
      await awardBadge(userId, 'Perfect Score');
    }

    // Journey completion badges
    const { data: completedChallenges } = await supabase
      .from('completed_challenges')
      .select('challenge_id')
      .eq('user_id', userId);

    if (completedChallenges?.length === 10) {
      await awardBadge(userId, 'Journey Pioneer');
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
  }
};

export const submitFeedback = async (userId: string, challengeId: string, rating: number, feedbackText: string) => {
  try {
    const { error } = await supabase
      .from('challenge_feedback')
      .insert({
        user_id: userId,
        challenge_id: challengeId,
        rating,
        feedback_text: feedbackText
      });

    if (error) throw error;
    toast.success('Thank you for your feedback!');
  } catch (error) {
    console.error('Error submitting feedback:', error);
    toast.error('Failed to submit feedback. Please try again.');
  }
};

export const awardBadge = async (userId: string, badgeName: string) => {
  try {
    const { data: badge } = await supabase
      .from('badges')
      .select('id')
      .eq('name', badgeName)
      .single();

    if (!badge) return;

    const { error } = await supabase
      .from('user_badges')
      .insert({
        user_id: userId,
        badge_id: badge.id
      });

    if (error && error.code !== '23505') { // Ignore unique constraint violations
      throw error;
    }

    toast.success(`Achievement Unlocked: ${badgeName}! 🎉`);
  } catch (error) {
    console.error('Error awarding badge:', error);
  }
};