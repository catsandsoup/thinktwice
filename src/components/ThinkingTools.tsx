import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Clock, 
  HelpCircle, 
  Lightbulb, 
  MessageSquare 
} from "lucide-react";
import { motion } from "framer-motion";

interface ThinkingToolsProps {
  onRequestHint: () => void;
  onStartThinkingTime: () => void;
  onShareReasoning: () => void;
}

export function ThinkingTools({
  onRequestHint,
  onStartThinkingTime,
  onShareReasoning
}: ThinkingToolsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
    >
      <Card className="p-4 hover:bg-accent cursor-pointer transition-colors" onClick={onStartThinkingTime}>
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-medium">Thinking Time</h3>
            <p className="text-sm text-muted-foreground">Take a moment to reflect</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:bg-accent cursor-pointer transition-colors" onClick={onRequestHint}>
        <div className="flex items-center space-x-3">
          <HelpCircle className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-medium">Need a Hint?</h3>
            <p className="text-sm text-muted-foreground">Get guidance for your thinking</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:bg-accent cursor-pointer transition-colors" onClick={onShareReasoning}>
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-medium">Share Your Reasoning</h3>
            <p className="text-sm text-muted-foreground">Explain your thought process</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}