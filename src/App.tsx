
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { Suspense, lazy } from "react";

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, isLoading } = useAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <ErrorBoundary>
              <Index />
            </ErrorBoundary>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={!user ? <Auth /> : <Navigate to="/" />}
      />
      <Route
        path="/argument-analysis"
        element={
          <ProtectedRoute>
            <ErrorBoundary>
              <ArgumentAnalysis />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route
        path="/beginners-journey"
        element={
          <ProtectedRoute>
            <ErrorBoundary>
              <BeginnersJourney />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route
        path="/thinking-tools"
        element={
          <ProtectedRoute>
            <ErrorBoundary>
              <ThinkingTools />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route
        path="/bridge-builder"
        element={
          <ProtectedRoute>
            <ErrorBoundary>
              <BridgeBuilder />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route
        path="/question-manager"
        element={
          <ProtectedRoute>
            <ErrorBoundary>
              <QuestionManager />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <ErrorBoundary>
              <Settings />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </Router>
        </DataProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
