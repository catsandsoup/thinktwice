import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JourneyType } from "@/data/challengeTypes";

export function JourneySelector({ value, onChange }: { 
  value: string;
  onChange: (value: string) => void;
}) {
  const { data: journeys } = useQuery({
    queryKey: ['journeys'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('journeys')
        .select('*')
        .in('type', ['argument', 'beginner'] as JourneyType[])
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching journeys:', error);
        throw error;
      }
      return data;
    }
  });

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Journey</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select journey" />
        </SelectTrigger>
        <SelectContent>
          {journeys?.map((journey) => (
            <SelectItem key={journey.id} value={journey.id}>
              {journey.title} ({journey.type})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}