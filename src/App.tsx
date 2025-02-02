import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import ArgumentAnalysis from "@/pages/ArgumentAnalysis";
import BeginnersJourney from "@/pages/BeginnersJourney";
import ThinkingTools from "@/pages/ThinkingTools";
import NotFound from "@/pages/NotFound";
import QuestionManager from "@/pages/QuestionManager";
import Settings from "@/pages/Settings";

function App() {
  return (
    <Router>
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
  );
}

export default App;