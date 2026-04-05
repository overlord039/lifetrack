export type Database = {
  public: {
    Tables: {
      learning_goals: {
        Row: {
          id: string;
          user_id: string;
          skill: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          daily_target: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          skill: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          daily_target: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          skill?: string;
          difficulty?: 'Easy' | 'Medium' | 'Hard';
          daily_target?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      daily_learning_progress: {
        Row: {
          id: string;
          user_id: string;
          goal_id: string;
          date: string;
          completed: number;
          status: 'Completed' | 'Partial' | 'Missed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          goal_id: string;
          date: string;
          completed?: number;
          status: 'Completed' | 'Partial' | 'Missed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          goal_id?: string;
          date?: string;
          completed?: number;
          status?: 'Completed' | 'Partial' | 'Missed';
          created_at?: string;
          updated_at?: string;
        };
      };
      budget_config: {
        Row: {
          id: string;
          user_id: string;
          monthly_budget: number;
          fixed_expenses: number;
          carry_forward_enabled: boolean;
          weekend_bonus_enabled: boolean;
          weekend_bonus_amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          monthly_budget: number;
          fixed_expenses?: number;
          carry_forward_enabled?: boolean;
          weekend_bonus_enabled?: boolean;
          weekend_bonus_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          monthly_budget?: number;
          fixed_expenses?: number;
          carry_forward_enabled?: boolean;
          weekend_bonus_enabled?: boolean;
          weekend_bonus_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      expenses: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          category: string;
          date: string;
          note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          category: string;
          date: string;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          category?: string;
          date?: string;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      diary_entries: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          did_today: string;
          learned: string;
          challenges: string;
          plan_tomorrow: string;
          mood: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          did_today: string;
          learned: string;
          challenges: string;
          plan_tomorrow: string;
          mood: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          did_today?: string;
          learned?: string;
          challenges?: string;
          plan_tomorrow?: string;
          mood?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
