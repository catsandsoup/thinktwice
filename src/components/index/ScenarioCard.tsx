import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Search, MessageSquare, GitBranch } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ScenarioCardProps {
  scenario: {
    id: string;
    title: string;
    description: string;
    icon_name: string;
  };
  index: number;
  onSelect: (scenarioId: string) => void;
}

export function ScenarioCard({ scenario, index, onSelect }: ScenarioCardProps) {
  const getScenarioIcon = (iconName: string): LucideIcon => {
    switch (iconName) {
      case 'search': return Search;
      case 'message-square': return MessageSquare;
      case 'git-branch': return GitBranch;
      case 'brain':
      default: return Brain;
    }
  };

  const Icon = getScenarioIcon(scenario.icon_name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary"
        onClick={() => onSelect(scenario.id)}
      >
        <div className="flex flex-col h-full">
          <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-left">
            {scenario.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-left">
            {scenario.description}
          </p>
          <Button 
            variant="ghost" 
            className="mt-4 self-start"
          >
            Start Journey →
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}