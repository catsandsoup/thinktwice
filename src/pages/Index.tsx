import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { NavigationTabs } from "@/components/index/NavigationTabs";
import { ScenarioCard } from "@/components/index/ScenarioCard";
import { UserProgress } from "@/components/index/UserProgress";

const Index = () => {
  const navigate = useNavigate();

  const { data: scenarios } = useQuery({
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

  const { data: userProgress } = useQuery({
    queryKey: ['user-progress'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
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

      const { data: existingJourney, error: updateError } = await supabase
        .from('user_journeys')
        .update({ last_activity: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('scenario_id', scenarioId)
        .select()
        .single();

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

      const scenario = scenarios?.find(s => s.id === scenarioId);
      switch(scenario?.title) {
        case "I saw something online and wasn't sure if it was true":
          navigate('/online-verification');
          break;
        case "I had an argument and felt stuck":
          navigate('/argument-analysis');
          break;
        case "I need to make an important decision":
          navigate('/decision-tools');
          break;
        case "I'm curious about thinking better":
          navigate('/critical-thinking');
          break;
        default:
          navigate('/online-verification');
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
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Error signing out");
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="container p-6">
        <div className="flex justify-center mb-4">
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

        <UserProgress progress={userProgress} />
      </main>
    </div>
  );
};

export default Index;