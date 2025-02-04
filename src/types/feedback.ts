export interface FeedbackWithDetails {
  id: string;
  rating: number;
  feedback_text: string | null;
  created_at: string;
  challenges: {
    title: string;
  };
  user: {
    display_name: string;
  };
}

export interface FeedbackTableProps {
  data: FeedbackWithDetails[];
  isLoading: boolean;
}