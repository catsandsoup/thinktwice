import { useState } from "react";
import { QuestionForm } from "@/components/admin/QuestionForm";
import { JourneySelector } from "@/components/admin/JourneySelector";

export default function QuestionManager() {
  const [selectedJourney, setSelectedJourney] = useState("");

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Question Manager</h1>
      </div>

      <div className="max-w-xl">
        <JourneySelector
          value={selectedJourney}
          onChange={setSelectedJourney}
        />

        {selectedJourney && (
          <div className="mt-8">
            <QuestionForm journeyId={selectedJourney} />
          </div>
        )}
      </div>
    </div>
  );
}