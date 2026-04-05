/*
  # LifeTrack Initial Database Schema

  ## Overview
  Creates the complete database schema for the LifeTrack application including tables for learning progress, budget management, expenses, and diary entries.

  ## Tables Created

  ### 1. `learning_goals`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `skill` (text) - Name of the skill being tracked
  - `difficulty` (text) - Easy, Medium, or Hard
  - `daily_target` (integer) - Number of questions/exercises per day
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `daily_learning_progress`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `goal_id` (uuid, references learning_goals)
  - `date` (date) - The date of progress
  - `completed` (integer) - Number completed on this day
  - `status` (text) - Completed, Partial, or Missed
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `budget_config`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `monthly_budget` (numeric) - Total monthly budget
  - `fixed_expenses` (numeric) - Fixed expenses included in budget
  - `carry_forward_enabled` (boolean) - Whether to carry forward unused daily budget
  - `weekend_bonus_enabled` (boolean)
  - `weekend_bonus_amount` (numeric)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `expenses`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `amount` (numeric) - Expense amount
  - `category` (text) - Expense category
  - `date` (date) - Date of expense
  - `note` (text, optional) - Additional notes
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `diary_entries`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `date` (date) - Entry date
  - `did_today` (text) - What was done today
  - `learned` (text) - What was learned
  - `challenges` (text) - Challenges faced
  - `plan_tomorrow` (text) - Plans for tomorrow
  - `mood` (text) - Mood emoji
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Users can only access their own data
  - Policies for SELECT, INSERT, UPDATE, DELETE operations
*/

-- Create learning_goals table
CREATE TABLE IF NOT EXISTS learning_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  daily_target integer NOT NULL CHECK (daily_target > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE learning_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning goals"
  ON learning_goals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learning goals"
  ON learning_goals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning goals"
  ON learning_goals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own learning goals"
  ON learning_goals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create daily_learning_progress table
CREATE TABLE IF NOT EXISTS daily_learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  goal_id uuid REFERENCES learning_goals(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  completed integer NOT NULL DEFAULT 0 CHECK (completed >= 0),
  status text NOT NULL CHECK (status IN ('Completed', 'Partial', 'Missed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(goal_id, date)
);

ALTER TABLE daily_learning_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning progress"
  ON daily_learning_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learning progress"
  ON daily_learning_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning progress"
  ON daily_learning_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own learning progress"
  ON daily_learning_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create budget_config table
CREATE TABLE IF NOT EXISTS budget_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  monthly_budget numeric NOT NULL CHECK (monthly_budget >= 0),
  fixed_expenses numeric NOT NULL DEFAULT 0 CHECK (fixed_expenses >= 0),
  carry_forward_enabled boolean DEFAULT true,
  weekend_bonus_enabled boolean DEFAULT false,
  weekend_bonus_amount numeric DEFAULT 0 CHECK (weekend_bonus_amount >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE budget_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own budget config"
  ON budget_config FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own budget config"
  ON budget_config FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own budget config"
  ON budget_config FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own budget config"
  ON budget_config FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  category text NOT NULL,
  date date NOT NULL,
  note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own expenses"
  ON expenses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own expenses"
  ON expenses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses"
  ON expenses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses"
  ON expenses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create diary_entries table
CREATE TABLE IF NOT EXISTS diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  did_today text NOT NULL,
  learned text NOT NULL,
  challenges text NOT NULL,
  plan_tomorrow text NOT NULL,
  mood text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own diary entries"
  ON diary_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diary entries"
  ON diary_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diary entries"
  ON diary_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own diary entries"
  ON diary_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_learning_goals_user_id ON learning_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_learning_progress_user_id ON daily_learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_learning_progress_date ON daily_learning_progress(date);
CREATE INDEX IF NOT EXISTS idx_daily_learning_progress_goal_id ON daily_learning_progress(goal_id);
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_diary_entries_user_id ON diary_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_diary_entries_date ON diary_entries(date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to update updated_at columns
CREATE TRIGGER update_learning_goals_updated_at
  BEFORE UPDATE ON learning_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_learning_progress_updated_at
  BEFORE UPDATE ON daily_learning_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budget_config_updated_at
  BEFORE UPDATE ON budget_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at
  BEFORE UPDATE ON expenses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_diary_entries_updated_at
  BEFORE UPDATE ON diary_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
