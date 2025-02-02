import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const awardBadge = async (userId: string, badgeName: string) => {
  try {
    const { data: badge } = await supabase
      .from('badges')
      .select('id')
      .eq('name', badgeName)
      .single();

    if (!badge) return;

    const { data: existingBadge } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', userId)
      .eq('badge_id', badge.id)
      .single();

    if (existingBadge) return;

    await supabase
      .from('user_badges')
      .insert({
        user_id: userId,
        badge_id: badge.id
      });

    toast.success(`New Achievement Unlocked: ${badgeName}! 🎉`, {
      duration: 4000
    });
  } catch (error) {
    console.error('Error awarding badge:', error);
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

    // Check streak
    const { data: achievements } = await supabase
      .from('user_achievements')
      .select('streak_count')
      .eq('user_id', userId)
      .single();

    if (achievements?.streak_count === 7) {
      await awardBadge(userId, 'Streak Master');
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
  }
};