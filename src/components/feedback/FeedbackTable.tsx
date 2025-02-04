import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FeedbackWithDetails } from "@/types/feedback";
import { memo } from "react";

type FeedbackTableProps = {
  feedback: FeedbackWithDetails[];
};

const FeedbackTable = memo(({ feedback }: FeedbackTableProps) => {
  return (
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
            <TableCell>{item.user?.display_name}</TableCell>
            <TableCell>{item.rating} ⭐</TableCell>
            <TableCell>{item.feedback_text}</TableCell>
            <TableCell>
              {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

FeedbackTable.displayName = 'FeedbackTable';

export default FeedbackTable;