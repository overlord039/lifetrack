'use server';

import { generateFinancialInsights, type GenerateFinancialInsightsInput, type GenerateFinancialInsightsOutput } from '@/ai/flows/generate-financial-insights';

export async function getFinancialInsights(input: GenerateFinancialInsightsInput): Promise<GenerateFinancialInsightsOutput> {
  return await generateFinancialInsights(input);
}
