import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FeedbackWithDetails } from "@/types/feedback";
import FeedbackTable from "@/components/feedback/FeedbackTable";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCallback } from "react";

export default function QuestionManager() {
  const fetchFeedback = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check if user is admin
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user?.id)
      .single();

    if (roles?.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    const { data, error } = await supabase
      .from('challenge_feedback')
      .select(`
        id,
        rating,
        feedback_text,
        created_at,
        challenges:challenge_id (
          title
        ),
        profiles:user_id (
          display_name
        )
      `);

    if (error) throw error;
    if (!data) return [];
    
    // Transform the data to match FeedbackWithDetails type
    const transformedData: FeedbackWithDetails[] = data.map(item => ({
      id: item.id,
      rating: item.rating,
      feedback_text: item.feedback_text,
      created_at: item.created_at,
      challenges: item.challenges,
      profiles: {
        display_name: item.profiles?.display_name || 'Anonymous'
      }
    }));
    
    return transformedData;
  }, []);

  const { data: feedback, error, isLoading } = useQuery({
    queryKey: ['feedback'],
    queryFn: fetchFeedback,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'An unexpected error occurred'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Question Feedback</h1>
        </div>

        <Card className="p-6">
          <FeedbackTable feedback={feedback || []} />
        </Card>
      </div>
    </ErrorBoundary>
  );
}