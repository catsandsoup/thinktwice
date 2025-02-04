import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Brain, Search, MessageSquare, GitBranch, LogOut, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

      const { error } = await supabase
        .from('user_journeys')
        .insert({
          user_id: user.id,
          scenario_id: scenarioId
        });

      if (error && error.code !== '23505') { // Ignore unique violation
        toast.error("Failed to start journey");
        return;
      }

      // Navigate based on scenario
      const scenario = scenarios?.find(s => s.id === scenarioId);
      switch(scenario?.title) {
        case "I saw something online and wasn't sure if it was true":
          navigate('/beginners-journey');
          break;
        case "I had an argument and felt stuck":
          navigate('/argument-analysis');
          break;
        case "I need to make an important decision":
          navigate('/thinking-tools');
          break;
        case "I'm curious about thinking better":
          navigate('/bridge-builder');
          break;
        default:
          navigate('/beginners-journey');
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

  const navigationTabs = [
    { title: "Settings", icon: Settings },
    { title: "Sign Out", icon: LogOut },
  ];

  const getScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case 'search': return Search;
      case 'message-square': return MessageSquare;
      case 'git-branch': return GitBranch;
      case 'brain':
      default: return Brain;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="container p-6">
        <div className="flex justify-center mb-4">
          <ExpandableTabs 
            tabs={navigationTabs} 
            onChange={handleNavigation}
            className="border-gray-200 dark:border-gray-800"
          />
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
          {scenarios?.map((scenario, index) => {
            const Icon = getScenarioIcon(scenario.icon_name);
            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary"
                  onClick={() => handleScenarioSelect(scenario.id)}
                >
                  <div className="flex flex-col h-full">
                    <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-left">
                      {scenario.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-left">
                      {scenario.description}
                    </p>
                    <Button 
                      variant="ghost" 
                      className="mt-4 self-start"
                    >
                      Start Journey →
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {userProgress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-4">Your Learning Journey</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Insights Gained</p>
                <p className="text-2xl font-bold">{userProgress.total_challenges_completed}</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Days Active</p>
                <p className="text-2xl font-bold">{userProgress.streak_count}</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;