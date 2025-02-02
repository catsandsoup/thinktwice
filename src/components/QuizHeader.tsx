import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuizHeaderProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
}

export function QuizHeader({ 
  title,
  currentQuestion,
  totalQuestions
}: QuizHeaderProps) {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between h-12 pt-2">
      <Button 
        variant="ghost" 
        onClick={handleExit}
        className="h-8 px-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Exit
      </Button>
      <h1 className="text-lg font-display font-medium text-purple-900">
        {title}
      </h1>
      <span className="h-8 flex items-center text-sm font-medium text-purple-700 bg-purple-50/80 px-3 rounded-full">
        {currentQuestion} of {totalQuestions}
      </span>
    </header>
  );
}