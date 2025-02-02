import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileFormSchema = z.object({
  display_name: z.string().min(2).max(30).nullable(),
  bio: z.string().max(160).nullable(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileSettingsProps {
  profile: any;
  avatarUrl: string | null;
  onAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export function ProfileSettings({ profile, avatarUrl, onAvatarUpload }: ProfileSettingsProps) {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      display_name: profile?.display_name || "",
      bio: profile?.bio || "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: values.display_name,
        bio: values.bio,
      })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl || "/placeholder.svg"}
            alt="Avatar"
            className="h-20 w-20 rounded-full object-cover"
          />
          <Label
            htmlFor="avatar"
            className="cursor-pointer rounded-md bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80"
          >
            Change Avatar
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarUpload}
            />
          </Label>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your display name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can @mention other users and organizations
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}