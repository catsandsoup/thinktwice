export type Theme = 'light' | 'dark' | 'system';

export type LearningStyle = 'visual' | 'text' | 'interactive';
export type SessionDuration = 'short' | 'medium' | 'long';
export type PracticeFrequency = 'daily' | 'weekly' | 'flexible';
export type Difficulty = 'gentle' | 'moderate' | 'challenging';

export interface LearningPreferences {
  learning_style: LearningStyle;
  session_duration: SessionDuration;
  practice_frequency: PracticeFrequency;
  starting_difficulty: Difficulty;
  notifications_enabled: boolean;
  high_contrast: boolean;
  dyslexic_font: boolean;
  large_text: boolean;
}

export interface Profile {
  id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  email_notifications: boolean;
  push_notifications: boolean;
  theme: Theme;
  enterprise_id: string | null;
  two_factor_enabled: boolean;
  learning_preferences?: LearningPreferences;
}

export interface PaymentMethod {
  id: string;
  provider: string;
  last_four: string;
  expiry_date: string;
  is_default: boolean;
}