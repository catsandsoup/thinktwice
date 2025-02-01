import { useState } from "react";
import { Challenge } from "@/components/Challenge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const challenges = [
  {
    title: "Analyzing News Headlines",
    description: "Compare these two headlines about the same climate study. Which one demonstrates more neutral, factual reporting?",
    type: "headline" as const,
    options: [
      {
        id: "1",
        text: "Study Shows 5% Temperature Rise in Arctic Region",
        isCorrect: true,
        explanation: "This headline presents the information neutrally, focusing on the specific data point without emotional language."
      },
      {
        id: "2",
        text: "CLIMATE CATASTROPHE: Earth's Fever Spirals Out of Control!",
        isCorrect: false,
        explanation: "This headline uses sensational language and emotional manipulation rather than presenting the facts objectively."
      }
    ],
    difficulty: "beginner" as const,
    xpReward: 50
  },
  {
    title: "Logical Fallacy Detection",
    description: "Which of these responses contains a straw man fallacy?",
    type: "fallacy" as const,
    options: [
      {
        id: "1",
        text: "We should invest more in public transportation to reduce traffic.",
        isCorrect: false,
        explanation: "This is the original argument, stated clearly without distortion."
      },
      {
        id: "2",
        text: "So you want to force everyone to give up their cars completely?",
        isCorrect: true,
        explanation: "This is a straw man fallacy - it misrepresents the original position by exaggerating it to an extreme."
      }
    ],
    difficulty: "beginner" as const,
    xpReward: 50
  },
  {
    title: "Media Bias Detection",
    description: "Which statement shows the most obvious bias in its language?",
    type: "media" as const,
    options: [
      {
        id: "1",
        text: "The city council voted 7-3 to approve the new park project.",
        isCorrect: false,
        explanation: "This is an objective statement of fact without loaded language."
      },
      {
        id: "2",
        text: "Corrupt city council rams through controversial park scheme despite public outcry.",
        isCorrect: true,
        explanation: "This uses loaded terms like 'corrupt', 'rams through', and 'scheme' to create bias."
      }
    ],
    difficulty: "beginner" as const,
    xpReward: 50
  }
];

const BeginnersJourney = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const navigate = useNavigate();

  const handleComplete = (correct: boolean, xp: number) => {
    if (correct) {
      setTotalXP(prev => prev + xp);
    }
    
    // Wait a bit for the toast to be visible before moving to next challenge
    setTimeout(() => {
      if (currentChallenge === challenges.length - 1) {
        navigate('/');
      } else {
        setCurrentChallenge(prev => prev + 1);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Beginner's Journey</h1>
          <div className="text-lg font-semibold">
            Challenge {currentChallenge + 1} of {challenges.length}
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Total XP earned: {totalXP}
        </div>

        <Challenge {...challenges[currentChallenge]} onComplete={handleComplete} />

        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mt-4"
        >
          Exit Journey
        </Button>
      </div>
    </div>
  );
};

export default BeginnersJourney;