import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Award, 
  Calendar, 
  Flame, 
  Star, 
  Zap,
  LucideIcon 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  earned_at: string;
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
  const { data: achievements } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as Achievement;
    },
  });

  const { data: badges } = useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
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
        `);
      
      if (error) throw error;
      return data as UserBadge[];
    },
  });

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
        <h2 className="text-xl font-bold mb-4">Your Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {badges?.map((badge) => {
            const Icon = iconMap[badge.icon_name] || Award;
            return (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50"
              >
                <Icon className="w-8 h-8 mb-2 text-primary" />
                <h3 className="font-semibold">{badge.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {badge.description}
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