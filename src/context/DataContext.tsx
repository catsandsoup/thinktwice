
import { createContext, useContext, ReactNode } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

// Create the client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

type DataProviderProps = {
  children: ReactNode;
};

export function DataProvider({ children }: DataProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// Custom hooks for data fetching
export function useScenarios() {
  return useQuery({
    queryKey: ['learning-scenarios'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_scenarios')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        throw error;
      }
      return data;
    },
  });
}

export function useUserProgress() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-progress', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') { // Code for no rows returned
        throw error;
      }
      return data;
    },
    enabled: !!user,
  });
}

// Add more data fetching hooks as needed
