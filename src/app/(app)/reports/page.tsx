import { AiInsights } from "@/components/reports/ai-insights";
import { getFinancialInsightsData } from "@/lib/queries/reports";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function ReportsPage() {
  const financialData = await getFinancialInsightsData();

  if (!financialData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Financial Reports</CardTitle>
          <CardDescription>
            Configure your budget to view financial insights and reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Go to Settings to set up your monthly budget and start tracking your expenses.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <AiInsights initialData={financialData} />
    </div>
  );
}
