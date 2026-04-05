import { SummaryCard } from "@/components/dashboard/summary-card";
import { DollarSign, Target, BookOpen, TrendingUp } from "lucide-react";
import { BudgetChart } from "@/components/dashboard/budget-chart";
import { LearningProgress } from "@/components/dashboard/learning-progress";
import { DiaryPrompt } from "@/components/dashboard/diary-prompt";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { getDashboardData } from "@/lib/queries/dashboard";

export default async function DashboardPage() {
    const {
        learningProgress,
        dailyBudget,
        diaryEntry,
        recentExpenses,
        budgetChartData,
        monthlySavings,
    } = await getDashboardData();

    const todayLearningStatus = learningProgress.length === 0
        ? 'Not Set'
        : learningProgress.every(p => p.status === 'Completed')
        ? 'Completed'
        : learningProgress.some(p => p.status === 'Partial' || p.status === 'Completed')
        ? 'In Progress'
        : 'Missed';

    const totalTarget = learningProgress.reduce((sum, p) => sum + p.goal.dailyTarget, 0);
    const totalCompleted = learningProgress.reduce((sum, p) => sum + p.completed, 0);

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <SummaryCard
                title="Today's Budget"
                value={dailyBudget ? `₹${dailyBudget.spentAmount.toLocaleString()}` : 'Not Set'}
                footer={dailyBudget ? `Remaining: ₹${Math.round(dailyBudget.remainingOrExcess).toLocaleString()}` : 'Configure your budget'}
                icon={DollarSign}
                status={dailyBudget ? (dailyBudget.status === 'Saved' ? 'positive' : 'negative') : 'neutral'}
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
                value={diaryEntry ? "Completed" : "Not Started"}
                footer={diaryEntry ? `Mood: ${diaryEntry.mood}` : "Write your entry"}
                icon={BookOpen}
                status={diaryEntry ? 'positive' : 'neutral'}
            />
            <SummaryCard
                title="Monthly Savings"
                value={`₹${Math.round(monthlySavings).toLocaleString()}`}
                footer={monthlySavings >= 0 ? 'On track' : 'Over budget'}
                icon={TrendingUp}
                status={monthlySavings >= 0 ? 'positive' : 'negative'}
            />
            <div className="lg:col-span-2">
                <BudgetChart data={budgetChartData} />
            </div>
            <div className="lg:col-span-2">
                <LearningProgress data={learningProgress} />
            </div>
            <div className="lg:col-span-2">
                <RecentActivity expenses={recentExpenses} />
            </div>
            <div className="lg:col-span-2">
                <DiaryPrompt entry={diaryEntry} />
            </div>
        </div>
    );
}
