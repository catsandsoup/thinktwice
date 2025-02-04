import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface QuizHeaderProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  scenario?: string;
}

export function QuizHeader({ 
  title,
  currentQuestion,
  totalQuestions,
  scenario
}: QuizHeaderProps) {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  };

  return (
    <header className="space-y-4">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={handleExit}
          className="h-12 px-4 text-base text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Journey
        </Button>
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-full"
        >
          Step {currentQuestion} of {totalQuestions}
        </motion.span>
      </div>
      
      {scenario && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground text-sm bg-muted p-4 rounded-lg"
        >
          Your scenario: {scenario}
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Let's explore this concept through a real-world example. Take your time to think it through.
        </p>
      </motion.div>
    </header>
  );
}