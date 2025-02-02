import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/components/Challenge";
import { supabase } from "@/integrations/supabase/client";
import { allChallenges } from "@/data/challenges";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BeginnersJourney = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [seenChallenges, setSeenChallenges] = useState<Set<string>>(new Set());
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const loadSeenChallenges = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const storedChallenges = localStorage.getItem(`seen-challenges-${user.id}`);
        if (storedChallenges) {
          setSeenChallenges(new Set(JSON.parse(storedChallenges)));
        }
      }
    };
    loadSeenChallenges();
  }, []);

  const availableChallenges = allChallenges
    .filter(challenge => !seenChallenges.has(challenge.id))
    .sort(() => Math.random() - 0.5);

  const handleComplete = async (correct: boolean) => {
    if (correct) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && availableChallenges[currentChallenge]) {
        const newSeenChallenges = new Set(seenChallenges);
        newSeenChallenges.add(availableChallenges[currentChallenge].id);
        setSeenChallenges(newSeenChallenges);
        localStorage.setItem(
          `seen-challenges-${user.id}`,
          JSON.stringify(Array.from(newSeenChallenges))
        );
      }
      
      if (currentChallenge === availableChallenges.length - 1) {
        setIsExiting(true);
        setTimeout(() => navigate('/'), 300);
      } else {
        setCurrentChallenge(prev => prev + 1);
      }
    }
  };

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => navigate('/'), 300);
  };

  if (!availableChallenges || availableChallenges.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-background"
      >
        <div className="container px-4 py-4 space-y-4">
          <div className="text-muted-foreground">
            You've completed all available challenges for now. Great job!
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            Return Home
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen bg-background ${isExiting ? 'animate-fade-out' : ''}`}
    >
      <div className="container px-4 space-y-4">
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
            Beginner's Journey
          </h1>
          <span className="h-8 flex items-center text-sm font-medium text-purple-700 bg-purple-50/80 px-3 rounded-full">
            {currentChallenge + 1} of {availableChallenges.length}
          </span>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentChallenge}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Challenge {...availableChallenges[currentChallenge]} onComplete={handleComplete} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BeginnersJourney;