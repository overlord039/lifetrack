'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating financial insights based on user expense data.
 *
 * generateFinancialInsights - A function that takes expense data as input and returns financial insights.
 * GenerateFinancialInsightsInput - The input type for the generateFinancialInsights function.
 * GenerateFinancialInsightsOutput - The return type for the generateFinancialInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFinancialInsightsInputSchema = z.object({
  totalBudget: z.number().describe('The total monthly budget.'),
  fixedExpensesIncluded: z.number().describe('The total amount of fixed expenses included in the budget.'),
  totalSpent: z.number().describe('The total amount spent during the month.'),
  savedOrOverspent: z.number().describe('The amount saved or overspent during the month (positive for saved, negative for overspent).'),
  categorySpending: z.record(z.string(), z.number()).describe('A record of spending by category, with category names as keys and amounts as values.'),
  dailyBudgetPerformance: z.array(z.object({
    date: z.string().describe('The date of the daily budget performance.'),
    allowedBudget: z.number().describe('The allowed budget for the day.'),
    spentAmount: z.number().describe('The amount spent on the day.'),
    remainingOrExcess: z.number().describe('The remaining or excess amount for the day (positive for remaining, negative for excess).'),
    status: z.string().describe('The status of the daily budget (e.g., Saved, Overspent, Balanced).'),
  })).describe('An array of daily budget performance records.'),
  weekendVsWeekdaySpend: z.object({
    weekendSpend: z.number().describe('The total amount spent on weekends.'),
    weekdaySpend: z.number().describe('The total amount spent on weekdays.'),
  }).describe('A summary of weekend versus weekday spending.'),
  holidaySpendingSummary: z.record(z.string(), z.number()).describe('A record of spending on holidays, with holiday names as keys and amounts as values.'),
});
export type GenerateFinancialInsightsInput = z.infer<typeof GenerateFinancialInsightsInputSchema>;

const GenerateFinancialInsightsOutputSchema = z.object({
  insights: z.array(z.string()).describe('An array of insights generated from the expense data.'),
});
export type GenerateFinancialInsightsOutput = z.infer<typeof GenerateFinancialInsightsOutputSchema>;

export async function generateFinancialInsights(input: GenerateFinancialInsightsInput): Promise<GenerateFinancialInsightsOutput> {
  return generateFinancialInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFinancialInsightsPrompt',
  input: {schema: GenerateFinancialInsightsInputSchema},
  output: {schema: GenerateFinancialInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the following expense data and provide a list of insights.

Total Budget: {{{totalBudget}}}
Fixed Expenses (Included): {{{fixedExpensesIncluded}}}
Total Spent: {{{totalSpent}}}
Saved or Overspent: {{{savedOrOverspent}}}

Category Spending:
{{#each (keys categorySpending)}}
  - {{this}}: {{{lookup ../categorySpending this}}}}
{{/each}}

Daily Budget Performance:
{{#each dailyBudgetPerformance}}
  - Date: {{{date}}}, Allowed: {{{allowedBudget}}}, Spent: {{{spentAmount}}}, Remaining/Excess: {{{remainingOrExcess}}}, Status: {{{status}}}
{{/each}}

Weekend vs Weekday Spend:
  - Weekend Spend: {{{weekendVsWeekdaySpend.weekendSpend}}}
  - Weekday Spend: {{{weekendVsWeekdaySpend.weekdaySpend}}}

Holiday Spending Summary:
{{#each (keys holidaySpendingSummary)}}
  - {{this}}: {{{lookup ../holidaySpendingSummary this}}}}
{{/each}}

Provide insights such as overspending days, spending patterns on weekends, and a breakdown of expenses by category. Focus on actionable advice to help the user better understand their financial behavior.
`, 
});

const generateFinancialInsightsFlow = ai.defineFlow(
  {
    name: 'generateFinancialInsightsFlow',
    inputSchema: GenerateFinancialInsightsInputSchema,
    outputSchema: GenerateFinancialInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
