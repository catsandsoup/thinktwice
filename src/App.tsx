import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import ArgumentAnalysis from "@/pages/ArgumentAnalysis";
import BeginnersJourney from "@/pages/BeginnersJourney";
import ThinkingTools from "@/pages/ThinkingTools";
import NotFound from "@/pages/NotFound";
import QuestionManager from "@/pages/QuestionManager";
import Settings from "@/pages/Settings";

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
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/argument-analysis" element={<ArgumentAnalysis />} />
          <Route path="/beginners-journey" element={<BeginnersJourney />} />
          <Route path="/thinking-tools" element={<ThinkingTools />} />
          <Route path="/question-manager" element={<QuestionManager />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;