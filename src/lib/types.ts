export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LearningGoal {
  skill: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dailyTarget: number;
}

export interface DailyLearningProgress {
  date: string; // YYYY-MM-DD
  goal: LearningGoal;
  completed: number;
  status: 'Completed' | 'Partial' | 'Missed';
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string; // YYYY-MM-DD
  note?: string;
}

export interface DailyBudget {
  date: string; // YYYY-MM-DD
  allowedBudget: number;
  spentAmount: number;
  remainingOrExcess: number;
  status: 'Saved' | 'Overspent' | 'Balanced';
}

export interface DiaryEntry {
    date: string; // YYYY-MM-DD
    didToday: string;
    learned: string;
    challenges: string;
    planTomorrow: string;
    mood: '😊' | '😐' | '😢' | '😡' | '🚀';
}
