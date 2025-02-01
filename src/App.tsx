import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import BeginnersJourney from "./pages/BeginnersJourney";
import TruthExplorer from "./pages/TruthExplorer";
import { Toaster } from "@/components/ui/sonner";
import { Sonner } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/beginners-journey"
              element={
                <ProtectedRoute>
                  <BeginnersJourney />
                </ProtectedRoute>
              }
            />
            <Route
              path="/truth-explorer"
              element={
                <ProtectedRoute>
                  <TruthExplorer />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <NotFound />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;