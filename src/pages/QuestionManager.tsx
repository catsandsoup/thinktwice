import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FeedbackTable } from "@/components/feedback/FeedbackTable";
import type { FeedbackWithDetails } from "@/types/feedback";

export default function QuestionManager() {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackWithDetails[]>([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from('feedback_with_user')
        .select(`
          id,
          rating,
          feedback_text,
          created_at,
          challenges:challenge_id (
            title
          ),
          user:user_id (
            display_name
          )
        `);

      if (error) {
        console.error('Error fetching feedback:', error);
        return;
      }

      if (data) {
        setFeedback(data as FeedbackWithDetails[]);
      }

      setIsLoading(false);
    };

    fetchFeedback();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Question Manager</h2>
          <p className="text-muted-foreground">
            Review and manage feedback from users.
          </p>
        </div>

        <FeedbackTable data={feedback} isLoading={isLoading} />
      </div>
    </div>
  );
}