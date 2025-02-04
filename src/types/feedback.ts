export interface FeedbackWithDetails {
  id: string;
  rating: number;
  feedback_text: string | null;
  created_at: string;
  challenges: {
    title: string;
  } | null;
  user: {
    display_name: string | null;
  } | null;
}

export interface FeedbackTableProps {
  data: FeedbackWithDetails[];
  isLoading: boolean;
}