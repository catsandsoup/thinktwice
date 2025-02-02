import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import ArgumentAnalysis from "@/pages/ArgumentAnalysis";
import BeginnersJourney from "@/pages/BeginnersJourney";
import ThinkingTools from "@/pages/ThinkingTools";
import BridgeBuilder from "@/pages/BridgeBuilder";
import NotFound from "@/pages/NotFound";
import QuestionManager from "@/pages/QuestionManager";
import Settings from "@/pages/Settings";
import Auth from "@/pages/Auth";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";

// Initialize the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster />
        <Sonner />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Index /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/argument-analysis"
            element={isAuthenticated ? <ArgumentAnalysis /> : <Navigate to="/login" />}
          />
          <Route
            path="/beginners-journey"
            element={isAuthenticated ? <BeginnersJourney /> : <Navigate to="/login" />}
          />
          <Route
            path="/thinking-tools"
            element={isAuthenticated ? <ThinkingTools /> : <Navigate to="/login" />}
          />
          <Route
            path="/bridge-builder"
            element={isAuthenticated ? <BridgeBuilder /> : <Navigate to="/login" />}
          />
          <Route
            path="/question-manager"
            element={isAuthenticated ? <QuestionManager /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;