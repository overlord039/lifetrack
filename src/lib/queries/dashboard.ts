import { createClient } from '@/lib/supabase/server';
import type { DailyBudget, DailyLearningProgress, DiaryEntry, Expense } from '@/lib/types';

export async function getDashboardData() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      learningProgress: [],
      dailyBudget: null,
      diaryEntry: null,
      recentExpenses: [],
      budgetChartData: [],
      monthlySavings: 0,
    };
  }

  const today = new Date().toISOString().split('T')[0];

  const [
    learningGoalsResult,
    learningProgressResult,
    budgetConfigResult,
    expensesResult,
    diaryEntryResult,
  ] = await Promise.all([
    supabase
      .from('learning_goals')
      .select('*')
      .eq('user_id', user.id),
    supabase
      .from('daily_learning_progress')
      .select('*, learning_goals(*)')
      .eq('user_id', user.id)
      .eq('date', today),
    supabase
      .from('budget_config')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle(),
    supabase
      .from('expenses')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(10),
    supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .maybeSingle(),
  ]);

  const learningProgress: DailyLearningProgress[] = (learningProgressResult.data || []).map((progress: any) => ({
    date: progress.date,
    goal: {
      skill: progress.learning_goals.skill,
      difficulty: progress.learning_goals.difficulty,
      dailyTarget: progress.learning_goals.daily_target,
    },
    completed: progress.completed,
    status: progress.status,
  }));

  const learningGoals = learningGoalsResult.data || [];
  for (const goal of learningGoals) {
    const existingProgress = learningProgress.find(
      (p) => p.goal.skill === goal.skill
    );
    if (!existingProgress) {
      learningProgress.push({
        date: today,
        goal: {
          skill: goal.skill,
          difficulty: goal.difficulty,
          dailyTarget: goal.daily_target,
        },
        completed: 0,
        status: 'Missed',
      });
    }
  }

  const budgetConfig = budgetConfigResult.data;
  let dailyBudget: DailyBudget | null = null;
  let budgetChartData: any[] = [];
  let monthlySavings = 0;

  if (budgetConfig) {
    const { data: todayExpenses } = await supabase
      .from('expenses')
      .select('amount')
      .eq('user_id', user.id)
      .eq('date', today);

    const spentToday = (todayExpenses || []).reduce((sum, exp) => sum + Number(exp.amount), 0);

    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const dailyBudgetAmount = (budgetConfig.monthly_budget - budgetConfig.fixed_expenses) / daysInMonth;
    const remaining = dailyBudgetAmount - spentToday;

    dailyBudget = {
      date: today,
      allowedBudget: dailyBudgetAmount,
      spentAmount: spentToday,
      remainingOrExcess: remaining,
      status: remaining > 0 ? 'Saved' : remaining < 0 ? 'Overspent' : 'Balanced',
    };

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    const { data: weekExpenses } = await supabase
      .from('expenses')
      .select('date, amount')
      .eq('user_id', user.id)
      .gte('date', last7Days[0])
      .lte('date', last7Days[6]);

    budgetChartData = last7Days.map((date) => {
      const dayExpenses = (weekExpenses || []).filter((e) => e.date === date);
      const spent = dayExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        spent,
        budget: dailyBudgetAmount,
      };
    });

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    const { data: monthExpenses } = await supabase
      .from('expenses')
      .select('amount')
      .eq('user_id', user.id)
      .gte('date', startOfMonth);

    const totalSpent = (monthExpenses || []).reduce((sum, exp) => sum + Number(exp.amount), 0);
    monthlySavings = budgetConfig.monthly_budget - budgetConfig.fixed_expenses - totalSpent;
  }

  const recentExpenses: Expense[] = (expensesResult.data || []).map((exp) => ({
    id: exp.id,
    amount: Number(exp.amount),
    category: exp.category,
    date: exp.date,
    note: exp.note || undefined,
  }));

  const diaryEntry: DiaryEntry | null = diaryEntryResult.data
    ? {
        date: diaryEntryResult.data.date,
        didToday: diaryEntryResult.data.did_today,
        learned: diaryEntryResult.data.learned,
        challenges: diaryEntryResult.data.challenges,
        planTomorrow: diaryEntryResult.data.plan_tomorrow,
        mood: diaryEntryResult.data.mood as any,
      }
    : null;

  return {
    learningProgress,
    dailyBudget,
    diaryEntry,
    recentExpenses,
    budgetChartData,
    monthlySavings,
  };
}
