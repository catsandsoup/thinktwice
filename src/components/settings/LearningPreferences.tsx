import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { motion } from "framer-motion";
import { Brain, Clock, Eye, Bell, Lock, Accessibility } from "lucide-react";

const learningPreferencesSchema = z.object({
  learning_style: z.enum(["visual", "text", "interactive"]),
  session_duration: z.enum(["short", "medium", "long"]),
  practice_frequency: z.enum(["daily", "weekly", "flexible"]),
  starting_difficulty: z.enum(["gentle", "moderate", "challenging"]),
  notifications_enabled: z.boolean(),
  high_contrast: z.boolean(),
  dyslexic_font: z.boolean(),
  large_text: z.boolean(),
});

type LearningPreferencesValues = z.infer<typeof learningPreferencesSchema>;

interface LearningPreferencesProps {
  profile: any;
}

export function LearningPreferences({ profile }: LearningPreferencesProps) {
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);
  
  const form = useForm<LearningPreferencesValues>({
    resolver: zodResolver(learningPreferencesSchema),
    defaultValues: {
      learning_style: profile?.learning_preferences?.learning_style || "visual",
      session_duration: profile?.learning_preferences?.session_duration || "medium",
      practice_frequency: profile?.learning_preferences?.practice_frequency || "flexible",
      starting_difficulty: profile?.learning_preferences?.starting_difficulty || "gentle",
      notifications_enabled: profile?.learning_preferences?.notifications_enabled ?? true,
      high_contrast: profile?.learning_preferences?.high_contrast || false,
      dyslexic_font: profile?.learning_preferences?.dyslexic_font || false,
      large_text: profile?.learning_preferences?.large_text || false,
    },
  });

  const onSubmit = async (values: LearningPreferencesValues) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        learning_preferences: values,
      })
      .eq("id", user.id);

    if (error) {
      console.error('Error updating learning preferences:', error);
      toast({
        title: "Error",
        description: "Failed to update learning preferences",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Your learning preferences have been updated",
    });
  };

  const handleReset = () => {
    setIsResetting(true);
    form.reset();
    setTimeout(() => setIsResetting(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Learning Style
              </CardTitle>
              <CardDescription>
                How would you like to explore new concepts?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="learning_style"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your preferred learning style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="visual">Show me with visuals and examples</SelectItem>
                        <SelectItem value="text">Let me read detailed explanations</SelectItem>
                        <SelectItem value="interactive">Guide me through exercises</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Learning Pace
              </CardTitle>
              <CardDescription>
                When and how often would you like to practice?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="session_duration"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your session length" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="short">Quick 5-minute sessions</SelectItem>
                        <SelectItem value="medium">15-minute deep dives</SelectItem>
                        <SelectItem value="long">Extended learning sessions</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="practice_frequency"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your practice frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily practice</SelectItem>
                        <SelectItem value="weekly">Weekly sessions</SelectItem>
                        <SelectItem value="flexible">Flexible schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Reminders & Notifications
              </CardTitle>
              <CardDescription>
                When would you like to be reminded to practice?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="notifications_enabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Learning reminders
                      </FormLabel>
                      <FormDescription>
                        Receive gentle nudges to maintain your learning momentum
                      </FormDescription>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5" />
                Reading Comfort
              </CardTitle>
              <CardDescription>
                Customize how content appears to match your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="high_contrast"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        High contrast mode
                      </FormLabel>
                      <FormDescription>
                        Increase text and background contrast
                      </FormDescription>
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
                name="dyslexic_font"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Dyslexia-friendly font
                      </FormLabel>
                      <FormDescription>
                        Use a font designed for easier reading
                      </FormDescription>
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
                name="large_text"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Larger text size
                      </FormLabel>
                      <FormDescription>
                        Increase the size of all text
                      </FormDescription>
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
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isResetting}
            >
              Reset to Defaults
            </Button>
            <Button type="submit">
              Save Preferences
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
