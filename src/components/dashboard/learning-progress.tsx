import type { DailyLearningProgress } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type LearningProgressProps = {
    data: DailyLearningProgress[];
};

export function LearningProgress({ data }: LearningProgressProps) {
    const totalTarget = data.reduce((sum, p) => sum + p.goal.dailyTarget, 0);
    const totalCompleted = data.reduce((sum, p) => sum + p.completed, 0);
    const overallProgress = totalTarget > 0 ? (totalCompleted / totalTarget) * 100 : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Today's Learning Goals</CardTitle>
                <CardDescription>
                    Overall progress: {totalCompleted} of {totalTarget} questions completed.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="w-20 text-sm font-medium">Overall</span>
                        <Progress value={overallProgress} className="flex-1" />
                        <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
                    </div>
                    {data.map((progress, index) => {
                        const itemProgress = progress.goal.dailyTarget > 0 ? (progress.completed / progress.goal.dailyTarget) * 100 : 0;
                        return (
                            <div key={index} className="flex items-center gap-4">
                                <span className="w-20 truncate text-sm font-medium">{progress.goal.skill}</span>
                                <Progress value={itemProgress} />
                                <span className="text-sm text-muted-foreground">{progress.completed}/{progress.goal.dailyTarget}</span>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
