import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ChallengeType } from "@/data/challengeTypes";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Grip, Plus, Trash2 } from "lucide-react";
import { ChallengeCard } from "@/components/challenges/ChallengeCard";
import { StandardChallenge } from "@/components/challenges/StandardChallenge";

type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
};

export function QuestionForm({ journeyId }: { journeyId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ChallengeType>("fallacy");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [options, setOptions] = useState<Option[]>([]);

  const handleAddOption = () => {
    setOptions([
      ...options,
      {
        id: crypto.randomUUID(),
        text: "",
        isCorrect: false,
        explanation: "",
      },
    ]);
  };

  const handleRemoveOption = (id: string) => {
    setOptions(options.filter((opt) => opt.id !== id));
  };

  const handleOptionChange = (id: string, field: keyof Option, value: string | boolean) => {
    setOptions(
      options.map((opt) =>
        opt.id === id ? { ...opt, [field]: value } : opt
      )
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOptions(items);
  };

  const handleSubmit = async () => {
    try {
      const { data: challenge, error: challengeError } = await supabase
        .from("challenges")
        .insert({
          title,
          description,
          type,
          difficulty,
          journey_id: journeyId,
        })
        .select()
        .single();

      if (challengeError) throw challengeError;

      const { error: optionsError } = await supabase
        .from("standard_challenge_options")
        .insert(
          options.map((opt) => ({
            challenge_id: challenge.id,
            text: opt.text,
            is_correct: opt.isCorrect,
            explanation: opt.explanation,
          }))
        );

      if (optionsError) throw optionsError;

      toast.success("Question created successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setType("fallacy");
      setDifficulty("beginner");
      setOptions([]);
    } catch (error) {
      console.error("Error creating question:", error);
      toast.error("Failed to create question");
    }
  };

  const previewChallenge = {
    id: "preview",
    title,
    description,
    type,
    difficulty,
    options: options.map(opt => ({
      id: opt.id,
      text: opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.explanation
    })),
    xpReward: 10
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            placeholder="Question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Question description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select value={type} onValueChange={(value) => setType(value as ChallengeType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fallacy">Fallacy</SelectItem>
                <SelectItem value="headline">Headline</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="source">Source</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficulty} onValueChange={(value) => setDifficulty(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Answer Options</h3>
            <Button onClick={handleAddOption} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Option
            </Button>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="options">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {options.map((option, index) => (
                    <Draggable key={option.id} draggableId={option.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="p-4 border rounded-lg space-y-4"
                        >
                          <div className="flex items-center gap-4">
                            <div {...provided.dragHandleProps}>
                              <Grip className="w-5 h-5 text-gray-400" />
                            </div>
                            <Input
                              placeholder="Option text"
                              value={option.text}
                              onChange={(e) =>
                                handleOptionChange(option.id, "text", e.target.value)
                              }
                              className="flex-1"
                            />
                            <Button
                              variant={option.isCorrect ? "default" : "outline"}
                              onClick={() =>
                                handleOptionChange(option.id, "isCorrect", !option.isCorrect)
                              }
                            >
                              {option.isCorrect ? "Correct" : "Incorrect"}
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleRemoveOption(option.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <Textarea
                            placeholder="Explanation for this option"
                            value={option.explanation}
                            onChange={(e) =>
                              handleOptionChange(option.id, "explanation", e.target.value)
                            }
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Create Question
        </Button>
      </div>

      <div className="lg:sticky lg:top-4">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        {(title || description || options.length > 0) && (
          <ChallengeCard challenge={previewChallenge}>
            <StandardChallenge
              {...previewChallenge}
              onComplete={() => {}}
            />
          </ChallengeCard>
        )}
      </div>
    </div>
  );
}