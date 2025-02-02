import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function JourneySelector({ value, onChange }: { 
  value: string;
  onChange: (value: string) => void;
}) {
  const { data: journeys } = useQuery({
    queryKey: ['journeys'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('journeys')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select journey" />
      </SelectTrigger>
      <SelectContent>
        {journeys?.map((journey) => (
          <SelectItem key={journey.id} value={journey.id}>
            {journey.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}