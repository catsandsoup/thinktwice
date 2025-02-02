import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Award, Users } from "lucide-react";

export function AdminPanel() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');
      
      if (rolesError) throw rolesError;

      const { data: userProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('user_id, level, stars');
      
      if (progressError) throw progressError;

      // Combine the data
      return userRoles.map(user => ({
        ...user,
        user_progress: userProgress.find(p => p.user_id === user.user_id)
      }));
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <Badge variant="secondary">
          <Users className="w-4 h-4 mr-2" />
          {users?.length || 0} Users
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {users?.map((user) => (
          <Card key={user.user_id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{user.user_id}</p>
                <p className="text-sm text-muted-foreground">Role: {user.role}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge>Level {user.user_progress?.level || 1}</Badge>
                <Badge variant="secondary">⭐ {user.user_progress?.stars || 0}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}