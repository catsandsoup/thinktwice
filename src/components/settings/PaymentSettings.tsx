import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PaymentSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment methods.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Payment methods will be implemented in a future update.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}