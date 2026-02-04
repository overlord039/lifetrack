"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { runFlow } from "@genkit-ai/next/client";
import { type GenerateFinancialInsightsInput, type GenerateFinancialInsightsOutput } from "@/ai/flows/generate-financial-insights";
import { Lightbulb, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AiInsightsProps = {
  initialData: GenerateFinancialInsightsInput;
};

export function AiInsights({ initialData }: AiInsightsProps) {
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setError(null);
    setInsights([]);

    try {
      const result = await runFlow<GenerateFinancialInsightsOutput, GenerateFinancialInsightsInput>('generateFinancialInsightsFlow', initialData);
      setInsights(result.insights);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error Generating Insights",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-accent" />
          Automated Financial Insights
        </CardTitle>
        <CardDescription>
          Use AI to analyze your spending habits and get personalized advice.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGenerateInsights} disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Generate Insights"}
        </Button>

        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[70%]" />
          </div>
        )}

        {insights.length > 0 && (
          <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
            <h3 className="font-semibold">Here's what I found:</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm">
              {insights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
