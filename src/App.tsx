import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BeginnersJourney from "./pages/BeginnersJourney";
import ArgumentAnalysis from "./pages/ArgumentAnalysis";
import { AdminPanel } from "@/components/AdminPanel";
import Settings from "./pages/Settings";
import QuestionManager from "./pages/QuestionManager";
import { StrictMode } from "react";

// Initialize the query client outside of the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const AppContent = () => (
  <div className="min-h-screen flex flex-col">
    <MainNav />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/beginners-journey" element={<BeginnersJourney />} />
        <Route path="/argument-analysis" element={<ArgumentAnalysis />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/questions" element={<QuestionManager />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </div>
);

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;