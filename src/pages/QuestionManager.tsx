import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import FeedbackTable from "@/components/feedback/FeedbackTable";
import type { FeedbackWithDetails } from "@/types/feedback";

export default function QuestionManager() {
  const [feedback, setFeedback] = useState<FeedbackWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
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

        if (error) throw error;
        setFeedback(data as FeedbackWithDetails[]);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Question Manager</h1>
          <p className="text-gray-600">
            Review and manage feedback from users
          </p>
        </div>

        <FeedbackTable data={feedback} isLoading={isLoading} />
      </div>
    </div>
  );
}