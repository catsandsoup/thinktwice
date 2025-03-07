import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { MatchingChallenge as MatchingChallengeType } from "@/data/challengeTypes";
import { useToast } from "@/hooks/use-toast";

type MatchingChallengeProps = MatchingChallengeType & {
  onComplete: (correct: boolean, xp: number) => void;
};

export function MatchingChallenge({ pairs, xpReward, onComplete }: MatchingChallengeProps) {
  const [selectedPair, setSelectedPair] = useState<{ claim?: string; evidence?: string }>({});
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const { toast } = useToast();

  const randomizedEvidence = useMemo(() => {
    const evidenceArray = pairs.map(pair => pair.evidence);
    for (let i = evidenceArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [evidenceArray[i], evidenceArray[j]] = [evidenceArray[j], evidenceArray[i]];
    }
    return evidenceArray;
  }, [pairs]);

  const handleSelect = (text: string, type: "claim" | "evidence") => {
    setSelectedPair(prev => ({ ...prev, [type]: text }));
  };

  const checkPair = () => {
    const { claim, evidence } = selectedPair;
    if (!claim || !evidence) return;

    const isMatch = pairs.some(pair => pair.claim === claim && pair.evidence === evidence);
    
    if (isMatch) {
      const newMatched = new Set(matchedPairs);
      newMatched.add(claim);
      setMatchedPairs(newMatched);
      setWrongAttempts(0);
      
      if (newMatched.size === pairs.length) {
        toast({
          title: "Excellent! 🎉",
          description: "You've matched all pairs correctly!",
        });
        onComplete(true, xpReward);
      } else {
        toast({
          title: "Correct Match!",
          description: "Keep going to find all pairs.",
        });
      }
    } else {
      toast({
        title: "Try Again",
        description: "These items don't match. Try different combinations.",
        variant: "destructive",
      });
      setWrongAttempts(prev => prev + 1);
    }
    setSelectedPair({});
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Claims</h3>
          {pairs.map(pair => (
            <div
              key={pair.id + "-claim"}
              className={`p-2 rounded cursor-pointer transition-colors ${
                matchedPairs.has(pair.claim)
                  ? "bg-green-100 dark:bg-green-900"
                  : selectedPair.claim === pair.claim
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => !matchedPairs.has(pair.claim) && handleSelect(pair.claim, "claim")}
            >
              {pair.claim}
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Evidence</h3>
          {randomizedEvidence.map((evidence, index) => (
            <div
              key={`evidence-${index}`}
              className={`p-2 rounded cursor-pointer transition-colors ${
                pairs.some(pair => pair.evidence === evidence && matchedPairs.has(pair.claim))
                  ? "bg-green-100 dark:bg-green-900"
                  : selectedPair.evidence === evidence
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => !pairs.some(pair => pair.evidence === evidence && matchedPairs.has(pair.claim)) && handleSelect(evidence, "evidence")}
            >
              {evidence}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {(selectedPair.claim && selectedPair.evidence) && (
          <Button onClick={checkPair} className="flex-1">
            Check Match
          </Button>
        )}
        
        {wrongAttempts >= 3 && (
          <Button
            variant="outline"
            onClick={() => setShowAnswer(!showAnswer)}
            className="whitespace-nowrap"
          >
            {showAnswer ? "Hide Answer" : "Display Answer"}
          </Button>
        )}
      </div>

      {showAnswer && (
        <div className="p-4 bg-muted rounded-lg space-y-4">
          <p className="font-medium">Correct Pairs:</p>
          {pairs.map((pair, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 p-2 border-b last:border-0">
              <p>{pair.claim}</p>
              <p>{pair.evidence}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}