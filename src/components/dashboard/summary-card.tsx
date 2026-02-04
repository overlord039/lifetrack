import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type SummaryCardProps = {
    title: string;
    value: string;
    footer: string;
    icon: LucideIcon;
    status: 'positive' | 'negative' | 'neutral';
};

export function SummaryCard({ title, value, footer, icon: Icon, status }: SummaryCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
            <CardFooter>
                 <p className={cn("text-xs text-muted-foreground", {
                    'text-green-600': status === 'positive',
                    'text-red-600': status === 'negative',
                })}>
                    {footer}
                </p>
            </CardFooter>
        </Card>
    );
}
