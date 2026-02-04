import { SummaryCard } from "@/components/dashboard/summary-card";
import { DollarSign, Target, BookOpen, TrendingUp } from "lucide-react";
import { BudgetChart } from "@/components/dashboard/budget-chart";
import { LearningProgress } from "@/components/dashboard/learning-progress";
import { DiaryPrompt } from "@/components/dashboard/diary-prompt";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { mockDailyBudget, mockLearningProgress, mockDiaryEntry, mockRecentExpenses, mockMonthlyBudgetChartData } from "@/lib/data";

export default function DashboardPage() {
    const todayLearningStatus = mockLearningProgress.every(p => p.status === 'Completed') 
        ? 'Completed' 
        : mockLearningProgress.some(p => p.status === 'Partial' || p.status === 'Completed') 
        ? 'In Progress' 
        : 'Missed';

    const totalTarget = mockLearningProgress.reduce((sum, p) => sum + p.goal.dailyTarget, 0);
    const totalCompleted = mockLearningProgress.reduce((sum, p) => sum + p.completed, 0);
    
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <SummaryCard 
                title="Today's Budget"
                value={`₹${mockDailyBudget.spentAmount.toLocaleString()}`}
                footer={`Remaining: ₹${mockDailyBudget.remainingOrExcess.toLocaleString()}`}
                icon={DollarSign}
                status={mockDailyBudget.status === 'Saved' ? 'positive' : 'negative'}
            />
            <SummaryCard 
                title="Today's Learning"
                value={todayLearningStatus}
                footer={`${totalCompleted} / ${totalTarget} questions`}
                icon={Target}
                status={todayLearningStatus === 'Completed' ? 'positive' : todayLearningStatus === 'In Progress' ? 'neutral' : 'negative'}
            />
            <SummaryCard 
                title="Daily Diary"
                value={mockDiaryEntry ? "Completed" : "Not Started"}
                footer={mockDiaryEntry ? `Mood: ${mockDiaryEntry.mood}` : "Write your entry"}
                icon={BookOpen}
                status={mockDiaryEntry ? 'positive' : 'neutral'}
            />
            <SummaryCard 
                title="Monthly Savings"
                value="₹4,500"
                footer="+5.2% from last month"
                icon={TrendingUp}
                status="positive"
            />
            <div className="lg:col-span-2">
                <BudgetChart data={mockMonthlyBudgetChartData} />
            </div>
            <div className="lg:col-span-2">
                <LearningProgress data={mockLearningProgress} />
            </div>
            <div className="lg:col-span-2">
                <RecentActivity expenses={mockRecentExpenses} />
            </div>
            <div className="lg:col-span-2">
                <DiaryPrompt entry={mockDiaryEntry} />
            </div>
        </div>
    );
}
