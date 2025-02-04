import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NavigationTabs } from "@/components/index/NavigationTabs";
import { ScenarioCard } from "@/components/index/ScenarioCard";
import { UserProgress } from "@/components/index/UserProgress";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const { data: scenarios, isLoading: scenariosLoading, error: scenariosError } = useQuery({
    queryKey: ['learning-scenarios'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_scenarios')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        toast.error("Failed to load scenarios");
        throw error;
      }
      return data;
    },
  });

  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ['user-progress'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching progress:', error);
        return null;
      }
      return data;
    },
  });

  const handleScenarioSelect = async (scenarioId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to continue");
        return;
      }

      toast.loading("Loading your journey...");

      const { data: existingJourney, error: updateError } = await supabase
        .from('user_journeys')
        .update({ last_activity: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('scenario_id', scenarioId)
        .select()
        .maybeSingle();

      if (!existingJourney) {
        const { error: insertError } = await supabase
          .from('user_journeys')
          .insert({
            user_id: user.id,
            scenario_id: scenarioId,
            last_activity: new Date().toISOString()
          });

        if (insertError) {
          console.error('Error creating journey:', insertError);
          toast.error("Failed to start journey");
          return;
        }
      }

      toast.dismiss();

      // Map scenario titles to their corresponding routes and challenge types
      const scenarioRoutes: { [key: string]: { route: string, challengeTypes: string[] } } = {
        "I saw something online and wasn't sure if it was true": {
          route: '/online-verification',
          challengeTypes: ['media', 'source', 'headline']
        },
        "I had an argument and felt stuck": {
          route: '/argument-analysis',
          challengeTypes: ['fallacy', 'word-selection']
        },
        "I need to make an important decision": {
          route: '/decision-tools',
          challengeTypes: ['matching', 'highlight']
        },
        "I'm curious about thinking better": {
          route: '/critical-thinking',
          challengeTypes: ['word-selection', 'matching', 'highlight']
        }
      };

      const scenario = scenarios?.find(s => s.id === scenarioId);
      if (scenario?.title && scenarioRoutes[scenario.title]) {
        navigate(scenarioRoutes[scenario.title].route);
      } else {
        toast.error("Journey not found");
        console.error('Unknown scenario title:', scenario?.title);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong");
    }
  };

  const handleNavigation = async (index: number | null) => {
    if (index === 0) {
      navigate("/settings");
    } else if (index === 1) {
      toast.loading("Signing out...");
      const { error } = await supabase.auth.signOut();
      toast.dismiss();
      
      if (error) {
        toast.error("Error signing out");
      } else {
        navigate("/login");
      }
    }
  };

  if (scenariosError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We couldn't load the learning scenarios
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="container p-6">
        <div className="flex justify-end mb-4">
          <NavigationTabs onNavigation={handleNavigation} />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            What brought you here today?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose a scenario that matches your interest, and we'll guide you through a personalized learning journey.
          </p>
        </motion.div>
      </header>

      <main className="container p-6 max-w-4xl mx-auto">
        {scenariosLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {scenarios?.map((scenario, index) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                index={index}
                onSelect={handleScenarioSelect}
              />
            ))}
          </div>
        )}

        {!progressLoading && userProgress && (
          <UserProgress progress={userProgress} />
        )}
      </main>
    </div>
  );
};

export default Index;