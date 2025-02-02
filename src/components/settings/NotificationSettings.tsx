import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
} from "@/components/ui/form";

const notificationFormSchema = z.object({
  email_notifications: z.boolean(),
  push_notifications: z.boolean(),
});

type NotificationFormValues = z.infer<typeof notificationFormSchema>;

interface NotificationSettingsProps {
  profile: any;
}

export function NotificationSettings({ profile }: NotificationSettingsProps) {
  const { toast } = useToast();
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      email_notifications: profile?.email_notifications ?? true,
      push_notifications: profile?.push_notifications ?? true,
    },
  });

  const onSubmit = async (values: NotificationFormValues) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        email_notifications: values.email_notifications,
        push_notifications: values.push_notifications,
      })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Notification settings updated successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email_notifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Notifications</FormLabel>
                    <FormDescription>Receive notifications via email</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="push_notifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Push Notifications</FormLabel>
                    <FormDescription>Receive push notifications</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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