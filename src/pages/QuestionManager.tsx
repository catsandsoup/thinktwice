import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function QuestionManager() {
  const [selectedJourney, setSelectedJourney] = useState("");

  const { data: feedback } = useQuery({
    queryKey: ['feedback'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Check if user is admin
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .single();

      if (roles?.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      const { data, error } = await supabase
        .from('challenge_feedback')
        .select(`
          *,
          challenges (
            title
          ),
          profiles (
            display_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Question Feedback</h1>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Challenge</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedback?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.challenges?.title}</TableCell>
                <TableCell>{item.profiles?.display_name}</TableCell>
                <TableCell>{item.rating} ⭐</TableCell>
                <TableCell>{item.feedback_text}</TableCell>
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}