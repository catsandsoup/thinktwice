import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function PrivacySettings() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const { error } = await supabase.auth.admin.deleteUser(
      (await supabase.auth.getUser()).data.user?.id ?? ''
    );

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete account",
        variant: "destructive",
      });
      return;
    }

    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy & Security</CardTitle>
        <CardDescription>
          Manage your privacy settings and account security.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Coming Soon",
                description: "Password change will be implemented in a future update.",
              });
            }}
          >
            Change Password
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}