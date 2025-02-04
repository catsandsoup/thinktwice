import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OnlineVerification from "./pages/OnlineVerification";
import ArgumentAnalysis from "./pages/ArgumentAnalysis";
import DecisionTools from "./pages/DecisionTools";
import CriticalThinking from "./pages/CriticalThinking";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import QuestionManager from "./pages/QuestionManager";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/online-verification" element={<OnlineVerification />} />
        <Route path="/argument-analysis" element={<ArgumentAnalysis />} />
        <Route path="/decision-tools" element={<DecisionTools />} />
        <Route path="/critical-thinking" element={<CriticalThinking />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/admin/questions" element={<QuestionManager />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;