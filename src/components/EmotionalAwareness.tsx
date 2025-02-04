import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type EmotionType = "excitement" | "anxiety" | "mixed" | "neutral";

interface EmotionalAwarenessProps {
  challengeId: string;
  onComplete: () => void;
}

export function EmotionalAwareness({ challengeId, onComplete }: EmotionalAwarenessProps) {
  const [emotion, setEmotion] = useState<EmotionType | null>(null);
  const [intensity, setIntensity] = useState<number>(3);
  const [physicalResponse, setPhysicalResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please log in to continue");
        return;
      }

      const { error } = await supabase
        .from('emotional_responses')
        .insert({
          user_id: user.id,
          challenge_id: challengeId,
          emotional_state: emotion,
          intensity,
          physical_response: physicalResponse
        });

      if (error) throw error;

      toast.success("Thank you for sharing your emotional state");
      onComplete();
    } catch (error) {
      console.error('Error saving emotional response:', error);
      toast.error("Failed to save your response");
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Before we begin, let's check in with your emotions</h3>
        <p className="text-muted-foreground">
          Taking a moment to recognize how you feel can help you make better decisions
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup
          value={emotion || ""}
          onValueChange={(value) => setEmotion(value as EmotionType)}
        >
          <div className="space-y-2">
            <Label>How do you feel about this challenge?</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excitement" id="excitement" />
                <Label htmlFor="excitement">Excitement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="anxiety" id="anxiety" />
                <Label htmlFor="anxiety">Anxiety</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mixed" id="mixed" />
                <Label htmlFor="mixed">Mixed feelings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">Neutral</Label>
              </div>
            </div>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label>How intense is this feeling? (1-5)</Label>
          <Slider
            value={[intensity]}
            onValueChange={([value]) => setIntensity(value)}
            max={5}
            min={1}
            step={1}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Mild</span>
            <span>Strong</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="physical">Notice any physical sensations?</Label>
          <Textarea
            id="physical"
            placeholder="e.g., tension in shoulders, butterflies in stomach..."
            value={physicalResponse}
            onChange={(e) => setPhysicalResponse(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleSubmit}
          className="w-full"
          disabled={!emotion}
        >
          Continue
        </Button>
      </div>
    </Card>
  );
}