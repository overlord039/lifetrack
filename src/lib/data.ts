import type { DailyBudget, DailyLearningProgress, DiaryEntry, Expense } from './types';

export const mockLearningProgress: DailyLearningProgress[] = [
  {
    date: new Date().toISOString().split('T')[0],
    goal: { skill: 'Python', difficulty: 'Easy', dailyTarget: 2 },
    completed: 1,
    status: 'Partial',
  },
  {
    date: new Date().toISOString().split('T')[0],
    goal: { skill: 'SQL', difficulty: 'Medium', dailyTarget: 1 },
    completed: 1,
    status: 'Completed',
  },
  {
    date: new Date().toISOString().split('T')[0],
    goal: { skill: 'System Design', difficulty: 'Hard', dailyTarget: 1 },
    completed: 0,
    status: 'Missed',
  },
];

export const mockDailyBudget: DailyBudget = {
  date: new Date().toISOString().split('T')[0],
  allowedBudget: 1500,
  spentAmount: 1250,
  remainingOrExcess: 250,
  status: 'Saved',
};

export const mockRecentExpenses: Expense[] = [
  { id: '1', amount: 350, category: 'Food', date: '2024-07-21', note: 'Lunch with team' },
  { id: '2', amount: 800, category: 'Transport', date: '2024-07-21', note: 'Cab to airport' },
  { id: '3', amount: 100, category: 'Coffee', date: '2024-07-20' },
  { id: '4', amount: 2500, category: 'Shopping', date: '2024-07-20', note: 'New shoes' },
];

export const mockMonthlyBudgetChartData = [
  { date: 'Jul 15', spent: 1100, budget: 1500 },
  { date: 'Jul 16', spent: 1600, budget: 1500 },
  { date: 'Jul 17', spent: 1400, budget: 1500 },
  { date: 'Jul 18', spent: 1800, budget: 1500 },
  { date: 'Jul 19', spent: 900, budget: 1500 },
  { date: 'Jul 20', spent: 1250, budget: 1500 },
  { date: 'Jul 21', spent: 1350, budget: 1500 },
];

export const mockDiaryEntry: DiaryEntry | null = null;
// To test with an entry, use this:
// export const mockDiaryEntry: DiaryEntry | null = {
//   date: '2024-07-21',
//   didToday: 'Worked on the LifeTrack project.',
//   learned: 'A lot about Next.js server components.',
//   challenges: 'Styling the sidebar was tricky.',
//   planTomorrow: 'Implement the diary module.',
//   mood: '🚀',
// };

export const financialDataForAI = {
  totalBudget: 50000,
  fixedExpensesIncluded: 25000,
  totalSpent: 22500,
  savedOrOverspent: 2500,
  categorySpending: {
    Food: 8000,
    Transport: 4500,
    Shopping: 6000,
    Entertainment: 3000,
    Utilities: 1000,
  },
  dailyBudgetPerformance: [
    { date: "2024-07-15", allowedBudget: 833, spentAmount: 900, remainingOrExcess: -67, status: "Overspent" },
    { date: "2024-07-16", allowedBudget: 833, spentAmount: 750, remainingOrExcess: 83, status: "Saved" },
    { date: "2024-07-17", allowedBudget: 833, spentAmount: 1000, remainingOrExcess: -167, status: "Overspent" },
    { date: "2024-07-18", allowedBudget: 833, spentAmount: 833, remainingOrExcess: 0, status: "Balanced" },
  ],
  weekendVsWeekdaySpend: {
    weekendSpend: 10000,
    weekdaySpend: 12500,
  },
  holidaySpendingSummary: {
    "Independence Day": 1500
  },
};
