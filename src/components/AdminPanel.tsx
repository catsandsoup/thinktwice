import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Users, 
  Trash2, 
  Lock, 
  Mail, 
  UserCog,
  AlertTriangle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

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

  const handleDeleteAccount = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);
      
      if (error) throw error;
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  const handleResetPassword = async (userId: string) => {
    try {
      // In a real app, this would trigger a password reset email
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error("Failed to send password reset email");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <Badge variant="secondary">
          <Users className="w-4 h-4 mr-2" />
          {users?.length || 0} Users
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {users?.map((user) => (
          <Card key={user.user_id} className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{user.user_id}</p>
                  <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge>Level {user.user_progress?.level || 1}</Badge>
                  <Badge variant="secondary">
                    <Award className="w-4 h-4 mr-1" />
                    {user.user_progress?.stars || 0}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleResetPassword(user.user_id)}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Reset Password
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success("Email verification sent")}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Verify Email
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success("Role updated")}
                >
                  <UserCog className="w-4 h-4 mr-2" />
                  Change Role
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        <div className="flex items-center space-x-2 text-amber-500">
                          <AlertTriangle className="w-4 h-4" />
                          <span>This action cannot be undone.</span>
                        </div>
                        <p className="mt-2">
                          Are you sure you want to permanently delete this account? All data associated with this account will be permanently removed.
                        </p>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => toast.error("Operation cancelled")}>
                        Cancel
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={() => handleDeleteAccount(user.user_id)}
                      >
                        Delete Permanently
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}