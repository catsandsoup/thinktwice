
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type ChallengeFeedbackProps = {
  challengeId: string;
  onClose: () => void;
};

export function ChallengeFeedback({ challengeId, onClose }: ChallengeFeedbackProps) {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const handleFeedbackSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to submit feedback");
        return;
      }

      const { error } = await supabase
        .from('challenge_feedback')
        .insert({
          challenge_id: challengeId,
          user_id: user.id,
          rating,
          feedback_text: feedbackText
        });

      if (error) throw error;

      toast.success("Thank you for your feedback!");
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-muted rounded-lg space-y-4">
      <h3 className="font-medium">How was this challenge?</h3>
      
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={cn(
              "p-1 rounded hover:bg-accent",
              rating >= star ? "text-yellow-500" : "text-gray-300"
            )}
          >
            <Star className="h-6 w-6" fill={rating >= star ? "currentColor" : "none"} />
          </button>
        ))}
      </div>

      <Textarea
        placeholder="Share your thoughts about this challenge (optional)"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        className="min-h-[100px]"
      />

      <div className="flex gap-2">
        <Button onClick={handleFeedbackSubmit} disabled={rating === 0}>
          Submit Feedback
        </Button>
        <Button variant="outline" onClick={onClose}>
          Skip
        </Button>
      </div>
    </div>
  );
}
