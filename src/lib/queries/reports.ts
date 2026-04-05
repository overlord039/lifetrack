import { createClient } from '@/lib/supabase/server';
import type { GenerateFinancialInsightsInput } from '@/ai/flows/generate-financial-insights';

export async function getFinancialInsightsData(): Promise<GenerateFinancialInsightsInput | null> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: budgetConfig } = await supabase
    .from('budget_config')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!budgetConfig) {
    return null;
  }

  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
  const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0];

  const { data: expenses } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.id)
    .gte('date', startOfMonth)
    .lte('date', endOfMonth)
    .order('date', { ascending: true });

  if (!expenses) {
    return null;
  }

  const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const savedOrOverspent = budgetConfig.monthly_budget - budgetConfig.fixed_expenses - totalSpent;

  const categorySpending: Record<string, number> = {};
  expenses.forEach((exp) => {
    categorySpending[exp.category] = (categorySpending[exp.category] || 0) + Number(exp.amount);
  });

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const dailyBudgetAmount = (budgetConfig.monthly_budget - budgetConfig.fixed_expenses) / daysInMonth;

  const dailyBudgetPerformance: Array<{
    date: string;
    allowedBudget: number;
    spentAmount: number;
    remainingOrExcess: number;
    status: string;
  }> = [];

  for (let day = 1; day <= new Date().getDate(); day++) {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), day).toISOString().split('T')[0];
    const dayExpenses = expenses.filter((e) => e.date === date);
    const spentAmount = dayExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const remainingOrExcess = dailyBudgetAmount - spentAmount;

    dailyBudgetPerformance.push({
      date,
      allowedBudget: dailyBudgetAmount,
      spentAmount,
      remainingOrExcess,
      status: remainingOrExcess > 0 ? 'Saved' : remainingOrExcess < 0 ? 'Overspent' : 'Balanced',
    });
  }

  const weekendSpend = expenses
    .filter((e) => {
      const day = new Date(e.date).getDay();
      return day === 0 || day === 6;
    })
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const weekdaySpend = expenses
    .filter((e) => {
      const day = new Date(e.date).getDay();
      return day !== 0 && day !== 6;
    })
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const holidaySpendingSummary: Record<string, number> = {};

  return {
    totalBudget: budgetConfig.monthly_budget,
    fixedExpensesIncluded: budgetConfig.fixed_expenses,
    totalSpent,
    savedOrOverspent,
    categorySpending,
    dailyBudgetPerformance,
    weekendVsWeekdaySpend: {
      weekendSpend,
      weekdaySpend,
    },
    holidaySpendingSummary,
  };
}
