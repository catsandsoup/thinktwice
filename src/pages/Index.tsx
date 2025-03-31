
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { NavigationTabs } from "@/components/index/NavigationTabs";
import { ScenarioCard } from "@/components/index/ScenarioCard";
import { UserProgress } from "@/components/index/UserProgress";
import { useScenarios, useUserProgress } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: scenarios, isLoading: scenariosLoading, error: scenariosError } = useScenarios();
  const { data: userProgress, isLoading: progressLoading } = useUserProgress();

  const handleScenarioSelect = async (scenarioId: string) => {
    try {
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
          navigate('/beginners-journey');
          break;
        case "I had an argument and felt stuck":
          navigate('/argument-analysis');
          break;
        case "Thinking Tools Journey":
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
      try {
        await signOut();
        navigate("/login");
      } catch (error) {
        toast.error("Error signing out");
      }
    }
  };

  if (scenariosLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (scenariosError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">Error Loading Content</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We encountered a problem loading your learning scenarios. Please try refreshing the page.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
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
          {scenarios && scenarios.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {scenarios.map((scenario, index) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  index={index}
                  onSelect={handleScenarioSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-10">
              <p className="text-gray-600 dark:text-gray-400">No learning scenarios available. Please check back later.</p>
            </div>
          )}

          <UserProgress progress={userProgress} isLoading={progressLoading} />
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
