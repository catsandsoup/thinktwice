import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, CreditCard, Bell, User, Shield, ArrowLeft, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Profile, LearningPreferences } from "@/types/settings";
import { validateProfileTheme } from "@/utils/profileUtils";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { PrivacySettings } from "@/components/settings/PrivacySettings";
import { LearningPreferences as LearningPreferencesComponent } from "@/components/settings/LearningPreferences";

const defaultLearningPreferences: LearningPreferences = {
  learning_style: "visual",
  session_duration: "medium",
  practice_frequency: "flexible",
  starting_difficulty: "gentle",
  notifications_enabled: true,
  high_contrast: false,
  dyslexic_font: false,
  large_text: false,
};

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch profile",
          variant: "destructive",
        });
        return;
      }

      if (profileData) {
        const validatedProfile: Profile = {
          ...profileData,
          theme: validateProfileTheme(profileData.theme),
          learning_preferences: profileData.learning_preferences 
            ? profileData.learning_preferences as LearningPreferences 
            : defaultLearningPreferences
        };
        
        setProfile(validatedProfile);

        if (profileData.avatar_url) {
          const { data: { publicUrl } } = supabase
            .storage
            .from('avatars')
            .getPublicUrl(profileData.avatar_url);
          setAvatarUrl(publicUrl);
        }
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Learning Preferences</h2>
            <p className="text-muted-foreground">
              Customize your learning experience to match your style and needs.
            </p>
          </div>
        </div>

        <Tabs defaultValue="learning" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 gap-4 bg-muted p-1">
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Learning
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning">
            <LearningPreferencesComponent profile={profile} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSettings
              profile={profile}
              avatarUrl={avatarUrl}
              onAvatarUpload={handleAvatarUpload}
            />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettings profile={profile} />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacySettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}