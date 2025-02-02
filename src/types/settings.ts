export interface Profile {
  id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  email_notifications: boolean;
  push_notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  enterprise_id: string | null;
  two_factor_enabled: boolean;
}

export interface PaymentMethod {
  id: string;
  provider: string;
  last_four: string;
  expiry_date: string;
  is_default: boolean;
}