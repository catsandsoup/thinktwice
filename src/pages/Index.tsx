import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Book, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/MainNav";

const Index = () => {
  const [scenarios, setScenarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const { data, error } = await supabase
        .from("learning_scenarios")
        .select("*");

      if (error) throw error;

      setScenarios(data || []);
    } catch (error) {
      console.error("Error fetching scenarios:", error);
      toast.error("Failed to load learning scenarios");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScenarioSelect = async (scenarioId: string) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error getting user:", userError);
        toast.error("Authentication error");
        return;
      }

      if (!user) {
        toast.error("Please log in to continue");
        return;
      }

      // First try to find existing journey
      const { data: existingJourney, error: journeyError } = await supabase
        .from('user_journeys')
        .select('*')
        .eq('user_id', user.id)
        .eq('scenario_id', scenarioId)
        .maybeSingle();

      if (journeyError) {
        console.error('Error checking existing journey:', journeyError);
        toast.error("Failed to check journey status");
        return;
      }

      // Update or insert the journey
      const { error: upsertError } = await supabase
        .from('user_journeys')
        .upsert(
          {
            user_id: user.id,
            scenario_id: scenarioId,
            last_activity: new Date().toISOString(),
            ...(existingJourney ? {} : { started_at: new Date().toISOString() })
          },
          {
            onConflict: 'user_id,scenario_id'
          }
        );

      if (upsertError) {
        console.error('Error updating journey:', upsertError);
        toast.error("Failed to start journey");
        return;
      }

      // Navigate based on scenario type
      const { data: scenario, error: scenarioError } = await supabase
        .from("learning_scenarios")
        .select("title")
        .eq("id", scenarioId)
        .single();

      if (scenarioError) {
        console.error("Error fetching scenario:", scenarioError);
        toast.error("Failed to load scenario details");
        return;
      }

      const routeMap: { [key: string]: string } = {
        "Beginner's Journey": "/beginners-journey",
        "Argument Analysis": "/argument-analysis",
        "Bridge Builder": "/bridge-builder",
        "Thinking Tools": "/thinking-tools",
      };

      const route = routeMap[scenario.title];
      if (route) {
        navigate(route);
      } else {
        console.error("Unknown scenario type:", scenario.title);
        toast.error("Invalid scenario type");
      }
    } catch (error) {
      console.error("Error in scenario selection:", error);
      toast.error("Failed to process selection");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to Critical Thinking
            </h1>
            <p className="text-muted-foreground">
              Choose your learning path to begin your journey.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((scenario: any) => (
              <Card
                key={scenario.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => handleScenarioSelect(scenario.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getScenarioIcon(scenario.title)}
                    {scenario.title}
                  </CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const getScenarioIcon = (title: string) => {
  switch (title) {
    case "Beginner's Journey":
      return <Book className="h-6 w-6" />;
    case "Thinking Tools":
      return <Brain className="h-6 w-6" />;
    default:
      return <Lightbulb className="h-6 w-6" />;
  }
};

export default Index;