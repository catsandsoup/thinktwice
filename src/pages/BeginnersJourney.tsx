import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Challenge } from "@/components/Challenge";
import { QuizHeader } from "@/components/QuizHeader";
import { supabase } from "@/integrations/supabase/client";
import { allChallenges } from "@/data/challenges";
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
      <div className="container px-4 py-4 space-y-4">
        <QuizHeader
          title="Beginner's Journey"
          currentQuestion={currentChallenge + 1}
          totalQuestions={availableChallenges.length}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Beginner's Journey</h1>
          <p className="text-muted-foreground">
            Start your journey into systematic thinking
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex-1 h-2 bg-secondary rounded-full">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${((currentChallenge + 1) / availableChallenges.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

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