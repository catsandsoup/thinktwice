import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MatchingChallenge as MatchingChallengeType } from "@/data/challenges";
import { useToast } from "@/hooks/use-toast";

interface MatchingChallengeProps extends MatchingChallengeType {
  onComplete: (correct: boolean, xp: number) => void;
}

export function MatchingChallenge({ pairs, xpReward, onComplete }: MatchingChallengeProps) {
  const [selectedPair, setSelectedPair] = useState<{ claim?: string; evidence?: string }>({});
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const { toast } = useToast();

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
    }
    setSelectedPair({});
  };

  return (
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
        {pairs.map(pair => (
          <div
            key={pair.id + "-evidence"}
            className={`p-2 rounded cursor-pointer transition-colors ${
              matchedPairs.has(pair.claim)
                ? "bg-green-100 dark:bg-green-900"
                : selectedPair.evidence === pair.evidence
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => !matchedPairs.has(pair.claim) && handleSelect(pair.evidence, "evidence")}
          >
            {pair.evidence}
          </div>
        ))}
      </div>

      {(selectedPair.claim && selectedPair.evidence) && (
        <Button onClick={checkPair} className="col-span-2 mt-4">
          Check Match
        </Button>
      )}
    </div>
  );
}