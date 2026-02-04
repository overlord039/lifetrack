import { AiInsights } from "@/components/reports/ai-insights";
import { financialDataForAI } from "@/lib/data";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <AiInsights initialData={financialDataForAI} />
      {/* Other report components would go here */}
    </div>
  );
}
