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
    xpReward: 10
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
    xpReward: 10
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
    xpReward: 10
  },
  {
    title: "Source Credibility Analysis",
    description: "Which source would be most reliable for current medical research findings?",
    type: "source" as const,
    options: [
      {
        id: "1",
        text: "A peer-reviewed article in a medical journal",
        isCorrect: true,
        explanation: "Peer-reviewed medical journals provide the most reliable, scientifically-validated information about medical research."
      },
      {
        id: "2",
        text: "A viral social media post by a wellness influencer",
        isCorrect: false,
        explanation: "Social media influencers often lack medical credentials and may promote unverified information for engagement."
      }
    ],
    difficulty: "beginner" as const,
    xpReward: 10
  },
  {
    title: "Identifying Ad Hominem Fallacies",
    description: "Which response demonstrates an ad hominem fallacy?",
    type: "fallacy" as const,
    options: [
      {
        id: "1",
        text: "Your economic proposal won't work because you've never run a business.",
        isCorrect: true,
        explanation: "This is an ad hominem fallacy because it attacks the person's characteristics rather than addressing their argument."
      },
      {
        id: "2",
        text: "Your economic proposal won't work because it doesn't account for inflation.",
        isCorrect: false,
        explanation: "This is a valid criticism that addresses the substance of the argument rather than attacking the person."
      }
    ],
    difficulty: "beginner" as const,
    xpReward: 10
  },
  {
    title: "Statistical Manipulation",
    description: "Which presentation of statistics appears to be misleading?",
    type: "media" as const,
    options: [
      {
        id: "1",
        text: "Sales increased from 10.1% to 10.4% this quarter",
        isCorrect: false,
        explanation: "This presents the data clearly and accurately, showing the actual percentage change."
      },
      {
        id: "2",
        text: "Sales SURGE by 300 basis points in DRAMATIC market shift!",
        isCorrect: true,
        explanation: "This uses dramatic language and presents the same 0.3% increase in a way that makes it seem much larger (300 basis points = 3%)."
      }
    ],
    difficulty: "beginner" as const,
    xpReward: 10
  },
  {
    title: "Correlation vs. Causation",
    description: "Which statement incorrectly implies causation?",
    type: "fallacy" as const,
    options: [
      {
        id: "1",
        text: "Ice cream sales and drowning incidents both increase in summer months.",
        isCorrect: false,
        explanation: "This statement only notes a correlation without implying that one causes the other."
      },
      {
        id: "2",
        text: "Ice cream sales are causing more drowning incidents this summer.",
        isCorrect: true,
        explanation: "This incorrectly assumes causation from correlation. Both increases are likely due to warmer weather, not a causal relationship."
      }
    ],
    difficulty: "beginner" as const,
    xpReward: 10
  },
  {
    title: "Evaluating Expert Opinions",
    description: "Which expert opinion should carry more weight in a discussion about climate change?",
    type: "source" as const,
    options: [
      {
        id: "1",
        text: "A celebrity's views shared on their popular podcast",
        isCorrect: false,
        explanation: "Celebrity status doesn't confer expertise in scientific matters. Their platform size doesn't validate their opinions on complex scientific topics."
      },
      {
        id: "2",
        text: "A published climate scientist's peer-reviewed research",
        isCorrect: true,
        explanation: "A climate scientist's peer-reviewed research represents verified expertise and has been validated by other experts in the field."
      }
    ],
    difficulty: "beginner" as const,
    xpReward: 10
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
    
    if (!correct) return; // Only proceed to next question if they got it right
    
    // Move to next challenge or return home if complete
    if (currentChallenge === challenges.length - 1) {
      navigate('/');
    } else {
      setCurrentChallenge(prev => prev + 1);
    }
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
