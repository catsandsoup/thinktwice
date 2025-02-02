import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Calendar, 
  ChevronDown,
  ChevronUp,
  Flame, 
  Star, 
  Zap,
  LucideIcon 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface UserBadgeData {
  id: string;
  earned_at: string;
  badges: {
    name: string;
    description: string;
    icon_name: string;
  };
}

interface Achievement {
  streak_count: number;
  total_challenges_completed: number;
  last_activity_date: string;
}

const iconMap: Record<string, LucideIcon> = {
  star: Star,
  calendar: Calendar,
  flame: Flame,
  award: Award,
  zap: Zap,
};

export function UserAchievements() {
  const [showAllBadges, setShowAllBadges] = useState(false);

  const { data: achievements } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data as Achievement;
    },
  });

  const { data: badges } = useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_badges')
        .select(`
          id,
          earned_at,
          badges (
            name,
            description,
            icon_name
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as UserBadgeData[];
    },
  });

  const displayedBadges = showAllBadges ? badges : badges?.slice(0, 3);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Your Progress</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-bold">
                {achievements?.streak_count || 0} days
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Challenges Completed</p>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">
                {achievements?.total_challenges_completed || 0}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Badges</h2>
          {badges && badges.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllBadges(!showAllBadges)}
            >
              {showAllBadges ? (
                <>
                  Show Less <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Show All <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {displayedBadges?.map((badge) => {
            const Icon = iconMap[badge.badges.icon_name] || Award;
            return (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50"
              >
                <Icon className="w-8 h-8 mb-2 text-primary" />
                <h3 className="font-semibold">{badge.badges.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {badge.badges.description}
                </p>
                <Badge variant="secondary" className="mt-2">
                  {new Date(badge.earned_at).toLocaleDateString()}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}