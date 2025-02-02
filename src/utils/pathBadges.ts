import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const awardPathBadge = async (pathName: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // First check if user already has this badge
    const { data: badge } = await supabase
      .from('badges')
      .select('id')
      .eq('name', pathName)
      .single();

    if (!badge) {
      console.error(`Badge ${pathName} not found`);
      return;
    }

    // Check if user already has this badge
    const { data: existingBadge } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', user.id)
      .eq('badge_id', badge.id)
      .maybeSingle();

    if (existingBadge) {
      console.log(`User already has ${pathName} badge`);
      return;
    }

    // Award the badge
    const { error } = await supabase
      .from('user_badges')
      .insert({
        user_id: user.id,
        badge_id: badge.id
      });

    if (error && error.code !== '23505') { // Ignore unique constraint violations
      throw error;
    }

    toast.success(`Achievement Unlocked: ${pathName}! 🎉`);
  } catch (error) {
    console.error('Error awarding badge:', error);
  }
};