export type FeedbackWithDetails = {
  id: string;
  rating: number;
  feedback_text: string | null;
  created_at: string | null;
  challenges: {
    title: string | null;
  } | null;
  profiles: {
    display_name: string | null;
  } | null;
};