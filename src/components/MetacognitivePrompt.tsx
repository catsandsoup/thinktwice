import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThinkingContext, getMetacognitiveSupport, getReflectivePrompts } from "@/utils/thinkingFramework";
import { motion, AnimatePresence } from "framer-motion";
import { EmotionalAwareness } from "./EmotionalAwareness";

interface MetacognitivePromptProps {
  context: ThinkingContext;
  challengeId: string;
}

export function MetacognitivePrompt({ context, challengeId }: MetacognitivePromptProps) {
  const [showPrompts, setShowPrompts] = useState(false);
  const [showEmotional, setShowEmotional] = useState(true);
  const support = getMetacognitiveSupport(context);
  const reflectivePrompts = getReflectivePrompts();

  const handleEmotionalComplete = () => {
    setShowEmotional(false);
    setShowPrompts(true);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {showEmotional && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <EmotionalAwareness 
              challengeId={challengeId}
              onComplete={handleEmotionalComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Button 
        variant="outline" 
        onClick={() => setShowPrompts(!showPrompts)}
        className="w-full"
      >
        {showPrompts ? "Hide Thinking Prompts" : "Need Help Thinking Through This?"}
      </Button>

      <AnimatePresence>
        {showPrompts && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-4 space-y-4">
              <p className="text-muted-foreground">{support}</p>
              <div className="space-y-2">
                {reflectivePrompts.map((prompt, index) => (
                  <p key={index} className="text-sm">{prompt}</p>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}