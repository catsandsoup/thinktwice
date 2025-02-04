import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Bell, User, Shield, ArrowLeft, Brain } from "lucide-react";
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

function isValidLearningPreferences(prefs: unknown): prefs is LearningPreferences {
  if (!prefs || typeof prefs !== 'object') return false;
  const p = prefs as Partial<LearningPreferences>;
  return (
    typeof p.learning_style === 'string' &&
    typeof p.session_duration === 'string' &&
    typeof p.practice_frequency === 'string' &&
    typeof p.starting_difficulty === 'string' &&
    typeof p.notifications_enabled === 'boolean' &&
    typeof p.high_contrast === 'boolean' &&
    typeof p.dyslexic_font === 'boolean' &&
    typeof p.large_text === 'boolean'
  );
}

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
        let preferences = defaultLearningPreferences;
        
        if (profileData.learning_preferences) {
          try {
            const parsedPrefs = typeof profileData.learning_preferences === 'string' 
              ? JSON.parse(profileData.learning_preferences)
              : profileData.learning_preferences;
              
            if (isValidLearningPreferences(parsedPrefs)) {
              preferences = parsedPrefs;
            }
          } catch (e) {
            console.error('Error parsing learning preferences:', e);
          }
        }

        const validatedProfile: Profile = {
          ...profileData,
          theme: validateProfileTheme(profileData.theme),
          learning_preferences: preferences,
          email_notifications: profileData.email_notifications ?? true,
          push_notifications: profileData.push_notifications ?? true,
          two_factor_enabled: profileData.two_factor_enabled ?? false
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

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive",
      });
      return;
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: filePath })
      .eq('id', user.id);

    if (updateError) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return;
    }

    const { data: { publicUrl } } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(filePath);
    
    setAvatarUrl(publicUrl);
    
    toast({
      title: "Success",
      description: "Avatar updated successfully",
    });
  };

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